/**
 * Custom logo for Sanity Studio's top-left corner.
 * Wired up via `studio.components.logo` in sanity.config.ts.
 *
 * Note: rendered inside the Studio shell (dark theme), so the logo PNG must
 * be visible on dark background. /images/logo-icon-final.png has a
 * transparent background and works on both light and dark.
 */
export default function StudioLogo() {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        height: '100%',
      }}
    >
      <img
        src="/images/logo-icon-final.png"
        alt="SkyFuture"
        style={{
          height: '32px',
          width: 'auto',
          objectFit: 'contain',
        }}
      />
      <span
        style={{
          fontWeight: 800,
          fontSize: '15px',
          letterSpacing: '-0.01em',
          color: 'inherit',
        }}
      >
        Sky<span style={{ color: '#f59e0b' }}>Future</span>
      </span>
    </span>
  )
}
