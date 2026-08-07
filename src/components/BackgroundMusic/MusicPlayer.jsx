'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import './MusicPlayer.css';

const BAR_REST = [0.36, 0.72, 0.55, 0.27];

function fmt(t) {
  if (!Number.isFinite(t) || t < 0) t = 0;
  return `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`;
}

function Equalizer({ playing, bars }) {
  return (
    <span className="mp__eq" aria-hidden="true">
      {bars.map((h, i) => (
        <span key={i} className="mp__eq-bar" data-on={playing} style={{ height: `${h}%` }} />
      ))}
    </span>
  );
}

/**
 * Ambient track player.
 *
 * Lives inline in the hero, then docks to the bottom-right corner (collapsed)
 * once the hero scrolls away, so it stays reachable without covering content.
 */
export default function MusicPlayer({ src, title = 'teman-ryo', docked = false }) {
  const reduced = useReducedMotion();

  const audioRef = useRef(null);
  const barRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [open, setOpen] = useState(true);
  const [time, setTime] = useState({ now: 0, total: 0 });
  const [volume, setVolume] = useState(30);
  const [bars, setBars] = useState(BAR_REST.map((v) => v * 100));

  // Collapse when docking, re-expand when returning to the hero.
  useEffect(() => setOpen(!docked), [docked]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.3;
    const sync = () => setTime({ now: audio.currentTime || 0, total: audio.duration || 0 });
    const onEnded = () => setPlaying(false);

    audio.addEventListener('loadedmetadata', sync);
    audio.addEventListener('timeupdate', sync);
    audio.addEventListener('ended', onEnded);
    return () => {
      audio.removeEventListener('loadedmetadata', sync);
      audio.removeEventListener('timeupdate', sync);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  // Idle bar shuffle — purely decorative, so reduced motion stops it entirely.
  useEffect(() => {
    if (!playing || reduced) {
      setBars(BAR_REST.map((v) => v * 100));
      return undefined;
    }
    const id = setInterval(
      () => setBars(BAR_REST.map(() => (0.2 + Math.random() * 0.62) * 100)),
      260,
    );
    return () => clearInterval(id);
  }, [playing, reduced]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().catch(() => {
        // Autoplay policies can reject this; keep the UI honest.
        setPlaying(false);
      });
      setPlaying(true);
    }
  }, [playing]);

  const seek = useCallback((e) => {
    const audio = audioRef.current;
    const bar = barRef.current;
    if (!audio || !bar || !audio.duration) return;
    const r = bar.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    audio.currentTime = ratio * audio.duration;
    setTime({ now: audio.currentTime, total: audio.duration });
  }, []);

  const onVolume = useCallback((e) => {
    const v = Number(e.currentTarget.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v / 100;
  }, []);

  const pct = time.total ? Math.min(100, (time.now / time.total) * 100) : 0;

  return (
    <div className="mp" data-docked={docked} data-open={open}>
      <audio ref={audioRef} src={src} loop preload="metadata" />

      {!open && (
        <button
          type="button"
          className="mp__pill"
          onClick={() => setOpen(true)}
          aria-label="Open music player"
        >
          <Equalizer playing={playing} bars={bars} />
        </button>
      )}

      {open && (
        <div className="mp__card">
          <div className="mp__art" aria-hidden="true">
            <Equalizer playing={playing} bars={bars} />
          </div>

          <div className="mp__body">
            <div className="mp__row">
              <span className="mp__title">{title}</span>
              <span className="mp__meta">
                <span className="mono mp__time">
                  {fmt(time.now)} / {fmt(time.total)}
                </span>
                <button
                  type="button"
                  className="mp__close"
                  onClick={() => setOpen(false)}
                  aria-label="Hide music player"
                >
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
                    <path
                      d="M1 1l6 6M7 1 1 7"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </span>
            </div>

            <button
              ref={barRef}
              type="button"
              className="mp__bar"
              onClick={seek}
              aria-label={`Seek track — ${Math.round(pct)} percent played`}
            >
              <span className="mp__bar-track" />
              <span className="mp__bar-fill" style={{ width: `${pct}%` }} />
              <span className="mp__bar-knob" style={{ left: `${pct}%` }} />
            </button>

            <div className="mp__controls">
              <button
                type="button"
                className="mp__play"
                onClick={togglePlay}
                aria-label={playing ? 'Pause music' : 'Play music'}
              >
                {playing ? (
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="currentColor">
                    <rect x="3" y="2.4" width="2.8" height="8.2" rx="1" />
                    <rect x="7.4" y="2.4" width="2.8" height="8.2" rx="1" />
                  </svg>
                ) : (
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="currentColor">
                    <path d="M3.6 2.2 10.6 6.5l-7 4.3V2.2Z" />
                  </svg>
                )}
              </button>

              <div className="mp__volume">
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path
                    d="M2 5.2h2.3L7.4 2.6v8.8L4.3 8.8H2V5.2Z"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.7 5.1a2.6 2.6 0 0 1 0 3.8"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                </svg>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={onVolume}
                  aria-label="Volume"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
