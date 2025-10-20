import '../App.css';

interface FooterProps {
  lastUpdate: string;
}

function Footer({ lastUpdate }: FooterProps) {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>☕ Indian Homebrews</h3>
          <p>Your ultimate specialty coffee library</p>
        </div>
        <div className="footer-info">
          <p>Discover beans from India's finest roasters</p>
          <p className="footer-update">Last updated: {new Date(lastUpdate).toLocaleString()}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
