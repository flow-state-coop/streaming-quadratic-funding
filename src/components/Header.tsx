import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAccount, useNetwork } from "wagmi";
import Stack from "react-bootstrap/Stack";
import Image from "react-bootstrap/Image";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../assets/logo.png";
import ConnectWallet from "./ConnectWallet";
import Profile from "./Profile";
import { useMediaQuery } from "../hooks/mediaQuery";
import { NETWORK_ID } from "../lib/constants";

export default function Header() {
  const location = useLocation();
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { isMobile } = useMediaQuery();

  useEffect(() => {
    (window as any).Intercom("boot", {
      api_base: "https://api-iam.intercom.io",
      app_id: "qonbdvt5",
    });
  }, []);

  useEffect(() => {
    (window as any).Intercom("update");
  }, [location.pathname]);

  return (
    <>
      <Navbar
        bg="dark"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          height: !isMobile ? 89 : 62,
        }}
        className="w-100 border-bottom border-secondary border-opacity-25"
      >
        <Stack
          direction="horizontal"
          className="justify-content-between w-100 px-4"
        >
          <Image src={Logo} alt="logo" width={isMobile ? 60 : 80} />
          {address && chain?.id === NETWORK_ID ? (
            <Profile />
          ) : (
            <ConnectWallet variant="header" />
          )}
        </Stack>
      </Navbar>
      <Outlet />
    </>
  );
}
