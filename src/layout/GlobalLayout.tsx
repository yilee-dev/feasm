import { ReactNode } from "react";

export default function GlobalLayout({ children }: { children?: ReactNode }) {
  return (
    <>
      <header>헤더</header>
      <main>{children}</main>
      <footer>푸터</footer>
    </>
  );
}
