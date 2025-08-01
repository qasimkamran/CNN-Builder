import './LogMessage.css';
import tickIcon from '../assets/tick.png';
import crossIcon from '../assets/cross.png';

const LogMessage = ({ message,
                      isError,
                      tickSrc = tickIcon,
                      crossSrc = crossIcon,
                      size = 16 }) => (
  <div
    className={`log-message ${isError ? 'error' : 'success'}`}
    style={{ '--icon-size': `${size}px` }}
    aria-live="polite"
  >
    <img
      className="icon"
      src={isError ? crossSrc : tickSrc}
      alt={isError ? 'error' : 'success'}
      width={size}
      height={size}
      onError={e => {
        const span = document.createElement('span');
        span.textContent = isError ? '✗' : '✓';
        span.setAttribute('aria-label', isError ? 'error' : 'success');
        span.className = 'fallback-icon';
        e.currentTarget.replaceWith(span);
      }}
    />
    <div className="message">{message}</div>
  </div>
);

export default LogMessage;

