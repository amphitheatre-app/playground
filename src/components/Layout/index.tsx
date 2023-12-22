function Layout({ children }: Readonly<{ children: any }>) {
  return (
    <div>
      <header></header>
      <main>{children}</main>
      <footer></footer>
    </div>
  );
}

export default Layout;
