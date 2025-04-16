import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error capturado:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>¡Ups! Algo salió mal.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
