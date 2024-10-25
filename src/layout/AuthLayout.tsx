export interface AuthLayoutProps {
  children?: JSX.Element;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return <div>{children}</div>;
};

export default AuthLayout;
