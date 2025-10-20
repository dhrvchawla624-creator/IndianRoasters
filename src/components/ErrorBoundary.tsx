import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error details for debugging
    console.error("Error caught by ErrorBoundary:", error);
    console.error("Error Info:", errorInfo);

    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
    // Reload the page to reset the application state
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #2C1810 0%, #4A2C1D 100%)",
            padding: "20px",
          }}
        >
          <div
            style={{
              maxWidth: "600px",
              width: "100%",
              background: "#FFFFFF",
              borderRadius: "16px",
              padding: "40px",
              textAlign: "center",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
            }}
          >
            <div
              style={{
                fontSize: "64px",
                marginBottom: "20px",
              }}
            >
              ☕💥
            </div>

            <h1
              style={{
                color: "#2C1810",
                fontSize: "32px",
                fontWeight: "700",
                marginBottom: "12px",
              }}
            >
              Oops! Something Went Wrong
            </h1>

            <p
              style={{
                color: "#6B4423",
                fontSize: "18px",
                marginBottom: "24px",
                lineHeight: "1.6",
              }}
            >
              We encountered an unexpected error while brewing your coffee
              experience. Don't worry, your coffee beans are safe!
            </p>

            {this.state.error && (
              <details
                style={{
                  background: "#FAF3E9",
                  borderRadius: "8px",
                  padding: "16px",
                  marginBottom: "24px",
                  textAlign: "left",
                  border: "2px solid #F5E6D3",
                }}
              >
                <summary
                  style={{
                    color: "#4A2C1D",
                    fontWeight: "600",
                    cursor: "pointer",
                    marginBottom: "8px",
                  }}
                >
                  Error Details (for developers)
                </summary>
                <div
                  style={{
                    fontSize: "14px",
                    color: "#6B4423",
                    fontFamily: "monospace",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  <strong>Error:</strong>{" "}
                  {this.state.error.message || "Unknown error"}
                  {this.state.errorInfo && (
                    <>
                      <br />
                      <br />
                      <strong>Stack Trace:</strong>
                      {this.state.errorInfo.componentStack ? (
                        this.state.errorInfo.componentStack
                      ) : (
                        <span style={{ color: "#B8860B" }}>
                          No stack trace available.
                        </span>
                      )}
                    </>
                  )}
                </div>
              </details>
            )}

            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={this.handleReset}
                style={{
                  background:
                    "linear-gradient(135deg, #D4AF37 0%, #C49B2E 100%)",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "8px",
                  padding: "14px 28px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  boxShadow: "0 4px 12px rgba(212, 175, 55, 0.3)",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 16px rgba(212, 175, 55, 0.4)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(212, 175, 55, 0.3)";
                }}
              >
                🔄 Reload & Try Again
              </button>

              <button
                onClick={() => (window.location.href = "/")}
                style={{
                  background: "#FFFFFF",
                  color: "#4A2C1D",
                  border: "2px solid #D4AF37",
                  borderRadius: "8px",
                  padding: "14px 28px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "#FAF3E9";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "#FFFFFF";
                }}
              >
                🏠 Go Home
              </button>
            </div>

            <p
              style={{
                marginTop: "24px",
                fontSize: "14px",
                color: "#8B6F47",
              }}
            >
              If this problem persists, please contact support or file an issue
              on GitHub.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
