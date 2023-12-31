"use client";
import { useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AppBar, Box, Button, IconButton, List, Toolbar } from "@mui/material";
import MenuOutlineIcon from "@mui/icons-material/MenuOutlined";
import { AuthContext, UiContext } from "@/context";
// Components
import { Logo } from "../Logo";
import Avatar from './Avatar';
import { HideOnScroll } from './HideOnScroll'
import { NAVBAR_ITEMS } from "@/components/ui/navbar/constants/navbarItems";
// Utils
import { IMAGES } from "@/commons/commons";
import { amber, blue } from "@mui/material/colors";



export function NavbarMain() {
  const asPath = usePathname();
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const { toggleSideMenu } = useContext(UiContext);
  return (
    <HideOnScroll>
      <AppBar elevation={1}>
        <Toolbar>
          <Logo width={35} height={35} />
          <Box flex={1} />
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {NAVBAR_ITEMS.APP.primary.map((route) => {
              const isActive = asPath === route.path;

              return <Button sx={{
                // mx: 1,
                textDecoration: isActive ? 'underline' : 'none',
                textDecorationColor: amber[800],
                textDecorationStyle: 'solid',
                textUnderlineOffset: '8px',
                textDecorationThickness: '2px',
                height: 60,
                fontWeight: 500,
                color: "white",
                fontSize: 18,
                transitionDuration: "0.25s",
                cursor: "pointer",
                ":hover": {
                  backgroundColor: blue['A700'],
                  borderRadius: 2
                },
              }} key={route.path} href={route.path} startIcon={route.icon} >{route.label}</Button>;
            })}

          </Box>
          <Box flex={1} />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
            className="fadeIn"
          >

            {user ? (
              <>
                <Avatar name={user.name} level={user?.level || 1} imgUrl={IMAGES.DEFAULT_PROFILE_IMAGE} />

              </>
            ) : (
              NAVBAR_ITEMS.notLogged.map((route) => {
                return (
                  <Button variant={route.label === 'Sign in' ? 'outlined' : 'contained'} sx={{ backgroundColor: route.label === 'Sign in' ? "primary.main" : "secondary.main", color: 'white', border: 'none' }} key={route.path(asPath)} onClick={() => router.push(route.path(asPath))}>
                    {route.icon && <> {route.icon}&nbsp;</>} {route.label}
                  </Button>
                );
              })
            )}
            <IconButton color="inherit" size="large" edge="end" onClick={toggleSideMenu}>
              <MenuOutlineIcon />
            </IconButton>
          </Box>


        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}


