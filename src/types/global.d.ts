declare namespace JSX {
  interface IntrinsicElements {
    // 'pixel-canvas' 태그를 정의합니다.
    'pixel-canvas': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      // data-속성들을 string 타입으로 정의합니다.
      'data-gap'?: string;
      'data-speed'?: string;
      'data-colors'?: string;
      'data-no-focus'?: boolean;
    };
  }
}