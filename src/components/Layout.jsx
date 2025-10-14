import Link from "next/link";

function Layout({ children }) {
  return (
    <div className="layout-container w-full h-full relative">
      <div className="nav-container flex gap-2">
        <Link href="/">Home</Link>
        <Link href="/map-bake">map-bake</Link>
        <Link href="/map-not-bake">map-not-bake</Link>
        <Link href="/scroll-rig">scroll-rig</Link>
        <Link href="/stacy">stacy</Link>
      </div>
      <div className="canvas-container">{children}</div>
    </div>
  );
}

export default Layout;
