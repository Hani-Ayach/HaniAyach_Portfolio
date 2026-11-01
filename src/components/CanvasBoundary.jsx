import { Component } from "react";

// 3D is decoration. If WebGL is blocked or a model fails to load, drop the
// canvas and keep the page; react-three-fiber rethrows those errors into React.
export default class CanvasBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}
