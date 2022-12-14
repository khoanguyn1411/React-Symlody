import styled from "@emotion/styled";

export const DrawerWrapperModule = styled.div`
  /* Drawer */
  .drawer {
    position: fixed;
    z-index: 9999;
    transition: width 0s ease 0.3s, height 0s ease 0.3s,
      transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
  }
  .drawer > * {
    transition: transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86),
      opacity 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86),
      box-shadow 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
  }
  .drawer.drawer-open {
    transition: transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
  }
  .drawer .drawer-mask {
    opacity: 0;
    width: 100%;
    height: 0;
    position: absolute;
    top: 0;
    left: 0;
    transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), height 0s ease 0.3s;
  }
  .drawer:not(.drawer-mask-blur) .drawer-mask {
    background: #000;
  }
  /* Drawer Mask Blur */
  .drawer.drawer-mask-blur .drawer-mask {
    @apply bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm;
  }
  .drawer-content-wrapper {
    position: absolute;
    background: #fff;
  }
  .drawer-content {
    overflow: auto;
    z-index: 1;
    position: relative;
  }
  .drawer-handle {
    position: absolute;
    top: 72px;
    width: 41px;
    height: 40px;
    cursor: pointer;
    z-index: 0;
    text-align: center;
    line-height: 40px;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
  }
  .drawer-handle-icon {
    width: 14px;
    height: 2px;
    background: #333;
    position: relative;
    transition: background 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
  }
  .drawer-handle-icon:before,
  .drawer-handle-icon:after {
    content: "";
    display: block;
    position: absolute;
    background: #333;
    width: 100%;
    height: 2px;
    transition: transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
  }
  .drawer-handle-icon:before {
    top: -5px;
  }
  .drawer-handle-icon:after {
    top: 5px;
  }
  .drawer-left,
  .drawer-right {
    width: 0%;
    height: 100%;
  }
  .drawer-left .drawer-content-wrapper,
  .drawer-right .drawer-content-wrapper,
  .drawer-left .drawer-content,
  .drawer-right .drawer-content {
    height: 100%;
  }
  .drawer-left.drawer-open,
  .drawer-right.drawer-open {
    width: 100%;
  }
  .drawer-left.drawer-open.no-mask,
  .drawer-right.drawer-open.no-mask {
    width: 0%;
  }
  .drawer-left {
    top: 0;
    left: 0;
  }
  .drawer-left .drawer-handle {
    right: -40px;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
    border-radius: 0 4px 4px 0;
  }
  .drawer-left.drawer-open .drawer-content-wrapper {
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
  }
  .drawer-right {
    top: 0;
    right: 0;
  }
  .drawer-right .drawer-content-wrapper {
    right: 0;
  }
  .drawer-right .drawer-handle {
    left: -40px;
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
    border-radius: 4px 0 0 4px;
  }
  .drawer-right.drawer-open .drawer-content-wrapper {
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
  }
  .drawer-right.drawer-open.no-mask {
    right: 1px;
    transform: translateX(1px);
  }
  .drawer-top,
  .drawer-bottom {
    width: 100%;
    height: 0%;
  }
  .drawer-top .drawer-content-wrapper,
  .drawer-bottom .drawer-content-wrapper,
  .drawer-top .drawer-content,
  .drawer-bottom .drawer-content {
    width: 100%;
  }
  .drawer-top .drawer-content,
  .drawer-bottom .drawer-content {
    height: 100%;
  }
  .drawer-top.drawer-open,
  .drawer-bottom.drawer-open {
    height: 100%;
  }
  .drawer-top.drawer-open.no-mask,
  .drawer-bottom.drawer-open.no-mask {
    height: 0%;
  }
  .drawer-top .drawer-handle,
  .drawer-bottom .drawer-handle {
    left: 50%;
    margin-left: -20px;
  }
  .drawer-top {
    top: 0;
    left: 0;
  }
  .drawer-top .drawer-handle {
    top: auto;
    bottom: -40px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    border-radius: 0 0 4px 4px;
  }
  .drawer-top.drawer-open .drawer-content-wrapper {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
  .drawer-bottom {
    bottom: 0;
    left: 0;
  }
  .drawer-bottom .drawer-content-wrapper {
    bottom: 0;
  }
  .drawer-bottom .drawer-handle {
    top: -40px;
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.15);
    border-radius: 4px 4px 0 0;
  }
  .drawer-bottom.drawer-open .drawer-content-wrapper {
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.15);
  }
  .drawer-bottom.drawer-open.no-mask {
    bottom: 1px;
    transform: translateY(1px);
  }
  .drawer.drawer-open .drawer-mask {
    opacity: 0.3;
    height: 100%;
    transition: opacity 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
  }
  /* Drawer Mask Blur */
  .drawer.drawer-mask-blur.drawer-open .drawer-mask {
    opacity: 1;
  }
  .drawer.drawer-open .drawer-handle-icon {
    background: transparent;
  }
  .drawer.drawer-open .drawer-handle-icon:before {
    transform: translateY(5px) rotate(45deg);
  }
  .drawer.drawer-open .drawer-handle-icon:after {
    transform: translateY(-5px) rotate(-45deg);
  }
`;
