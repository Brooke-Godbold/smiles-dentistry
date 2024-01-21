import { createGlobalStyle, css } from 'styled-components'

const GlobalStyles = createGlobalStyle`
:root {
  /* Brand */
  --color-brand-100: #edf2f4;
  --color-brand-200: #b5c9d3;
  --color-brand-300: #91aebc;
  --color-brand-400: #6c93a6;
  --color-brand-500: #477890;
  --color-brand-600: #396073;
  --color-brand-700: #2b4856;
  --color-brand-800: #1c303a;
  --color-brand-850: #0e181d;
  --color-brand-900: #070c0e;

  --color-brand-850-transparent: #0e181dc0;

  /* Blue */
  --color-blue-300: #2B50AA;
  --color-blue-600: #132a64;

  /* Grey */
  --color-grey-0: #fff;
  --color-grey-50: #f9fafb;
  --color-grey-100: #f3f4f6;
  --color-grey-200: #e5e7eb;
  --color-grey-300: #d1d5db;
  --color-grey-400: #9ca3af;
  --color-grey-500: #6b7280;
  --color-grey-600: #4b5563;
  --color-grey-700: #374151;
  --color-grey-800: #1f2937;
  --color-grey-900: #111827;

  --color-red-100: #ffdfdf;
  --color-red-400: rgb(255, 84, 84, 0.7);
  --color-red-600: #db2727;
  --color-red-700: #b91c1c;
  --color-red-800: #991b1b;

  --color-green-300: #69db7c;
  --color-green-400: #55a165;
  --color-green-500: #2b8a3e;
  --color-green-600: #1a5325;


  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);

  --border-radius-sm: 3px;
  --border-radius-md: 5px;
  --border-radius-lg: 7px;

  /* For dark mode */
  --image-grayscale: 0;
  --image-opacity: 100%;

  --brand-image-url: "https://xhkwznfhytvgvorvkcdp.supabase.co/storage/v1/object/public/brand/logo.png"
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html {
  font-size: 62.5%;
  height: 100%;
}

body {
  font-family: "Bitter", sans-serif;
  color: var(--color-brand-300);
  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.5;
  font-size: 1.6rem;
  font-weight: 400;
  height: 100%;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-brand-600);
  outline-offset: -1px;
}

a {
  color: inherit;
  text-decoration: none;
  cursor: pointer;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

img {
  max-width: 100%;
}

div,
p {
  cursor: default;
}

select {
  cursor: pointer;
}

::selection {
  color: var(--color-brand-100);
  text-shadow: var(--color-brand-200) 1px 0 10px;
}
`

const CommonScrollBar = css`
  &::-webkit-scrollbar {
    width: 12px; /* width of the entire scrollbar */
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--color-brand-600); /* color of the scroll thumb */
    border: 3px solid var(--color-brand-600); /* creates padding around scroll thumb */
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: var(--color-brand-400); /* color of the scroll thumb */
    border: 3px solid var(--color-brand-400); /* creates padding around scroll thumb */
  }

  scrollbar-width: thin;

  scrollbar-color: var(--color-brand-600) transparent;
  scroll-padding: 3px;
`

const CommonPage = css`
  max-width: 120em;
  height: 100%;

  background-color: var(--color-brand-800);

  padding: 4.8rem 3.6rem 2.4rem 3.6rem;
  margin: 0 auto;
  margin-bottom: 1.2rem;
  border-radius: 3px;

  flex: 1;

  display: flex;
  flex-direction: column;
  gap: 4.8rem;

  @media (max-width: 120em) {
    width: 100%;
  }

  @media (max-width: 20em) {
    padding: 1.2rem;
  }
`

const CommonButton = css`
  border: none;
  background-color: var(--color-brand-800);
  border-radius: 3px;
  padding: 0.8rem 1.8rem;

  text-align: center;

  font-size: 2.8rem;

  transition: all 0.3s;

  &:hover {
    background-color: var(--color-brand-700);
  }

  @media (max-width: 120em) {
    font-size: 1.6rem;
  }

  @media (max-width: 80em) {
    padding: 0.8rem 1.6rem;
  }
`

export default GlobalStyles

export { CommonScrollBar, CommonPage, CommonButton }
