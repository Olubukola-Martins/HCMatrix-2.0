import React from "react";

export interface IconProps
  extends React.ButtonHTMLAttributes<HTMLOrSVGElement> {}
const SendMessageIcon: React.FC<IconProps> = (props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clip-path="url(#clip0_4377_23498)">
        <path
          d="M23.2009 0.801248L23.9369 1.11645C24.0002 0.969378 24.0179 0.806684 23.9878 0.649416C23.9577 0.492148 23.881 0.347544 23.7678 0.234315C23.6546 0.121086 23.51 0.044442 23.3527 0.0143006C23.1954 -0.0158409 23.0327 0.00190714 22.8857 0.0652482L23.2009 0.801248ZM0.800857 10.4012L0.485657 9.66525C0.349982 9.72322 0.232981 9.81759 0.147592 9.93791C0.0622027 10.0582 0.0117514 10.1998 0.00181613 10.347C-0.00811915 10.4942 0.0228486 10.6413 0.0912956 10.772C0.159742 10.9027 0.263002 11.012 0.389657 11.0876L0.800857 10.4012ZM13.6009 23.2012L12.9145 23.6124C12.9901 23.7391 13.0994 23.8424 13.2301 23.9108C13.3608 23.9793 13.5079 24.0102 13.6551 24.0003C13.8023 23.9904 13.9439 23.9399 14.0642 23.8545C14.1845 23.7691 14.2789 23.6521 14.3369 23.5164L13.6009 23.2012ZM22.8857 0.0652482L0.485657 9.66525L1.11606 11.1372L23.5161 1.53725L22.8857 0.0652482ZM0.389657 11.0876L8.38966 15.8892L9.21206 14.5164L1.21206 9.71645L0.389657 11.0876ZM8.11286 15.6124L12.9129 23.6124L14.2857 22.79L9.48566 14.79L8.11286 15.6124ZM14.3353 23.5164L23.9353 1.11645L22.4633 0.486048L12.8633 22.886L14.3353 23.5164ZM22.6345 0.236448L8.23446 14.6364L9.36726 15.7676L23.7673 1.36765L22.6345 0.234848V0.236448Z"
          className="fill-caramel"
        />
      </g>
      <defs>
        <clipPath id="clip0_4377_23498">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default SendMessageIcon;