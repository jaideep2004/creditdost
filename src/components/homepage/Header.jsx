import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  useMediaQuery,
  styled,
  Menu,
  MenuItem,
  Container,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Dashboard as DashboardIcon,
  KeyboardArrowDown,
  Search as SearchIcon,
  Phone as PhoneIcon,
  Facebook,
  Twitter,
  LinkedIn,
  YouTube,
  ArrowForward,
} from "@mui/icons-material";

const HeaderAppBar = styled(AppBar)(({ theme, scrolled }) => ({
  backgroundColor: scrolled ? "rgba(255, 255, 255, 0.98)" : "#ffffff",
  backdropFilter: "blur(10px)",
  boxShadow: scrolled ? "0 4px 30px rgba(0, 0, 0, 0.08)" : "0 2px 20px rgba(0, 0, 0, 0.05)",
  color: "#1a2744",
  position: "sticky",
  top: 0,
  zIndex: 1200,
  transition: "all 0.3s ease",
}));

const TopBar = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)",
  color: "white",
  padding: "8px 0",
  fontSize: "0.875rem",
}));

const LogoBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  position: "relative",
//   "&::before": {
//     content: '""',
//     position: "absolute",
//     left: "-30px",
//     top: "-50px",
//     width: "200px",
//     height: "200px",
//     background: "linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)",
//     clipPath: "polygon(0 0, 100% 0, 0 100%)",
//     zIndex: -1,
//   },
}));

const LogoIcon = styled(Box)(({ theme }) => ({
  width: 40,
  height: 40,
  background: "linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  fontWeight: 700,
  fontSize: "1.2rem",
  marginRight: theme.spacing(1.5),
  boxShadow: "0 4px 15px rgba(8, 145, 178, 0.3)",
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: "1.75rem",
  background: "linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  letterSpacing: "-0.5px",
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: "#1a2744",
  fontWeight: 600,
  textTransform: "none",
  margin: theme.spacing(0, 0.5),
  padding: theme.spacing(1, 2),
  borderRadius: "8px",
  fontSize: "0.95rem",
  position: "relative",
  "&:hover": {
    backgroundColor: "rgba(8, 145, 178, 0.08)",
    "&::after": {
      width: "100%",
    },
  },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: 0,
    height: "2px",
    background: "linear-gradient(90deg, #0891b2, #06b6d4)",
    transition: "width 0.3s ease",
  },
}));

const GetQuoteButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)",
  color: "white",
  fontWeight: 700,
  textTransform: "none",
  padding: theme.spacing(1.5, 4),
  borderRadius: "50px",
  fontSize: "0.95rem",
  boxShadow: "0 4px 20px rgba(8, 145, 178, 0.3)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 25px rgba(8, 145, 178, 0.4)",
    background: "linear-gradient(135deg, #0e7490 0%, #0891b2 100%)",
  },
}));

const ContactBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.5),
  marginRight: theme.spacing(3),
  padding: theme.spacing(1, 2),
  borderRadius: "50px",
  backgroundColor: "rgba(8, 145, 178, 0.08)",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "rgba(8, 145, 178, 0.12)",
  },
}));

const PhoneIconBox = styled(Box)(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: "50%",
  background: "linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  animation: "pulse 2s infinite",
  "@keyframes pulse": {
    "0%, 100%": {
      boxShadow: "0 0 0 0 rgba(8, 145, 178, 0.4)",
    },
    "50%": {
      boxShadow: "0 0 0 10px rgba(8, 145, 178, 0)",
    },
  },
}));

const SocialIcon = styled(IconButton)(({ theme }) => ({
  color: "white",
  fontSize: "0.9rem",
  padding: theme.spacing(0.5),
  transition: "all 0.3s ease",
  "&:hover": {
    color: "#fff",
    transform: "translateY(-2px)",
  },
}));

const SearchIconButton = styled(IconButton)(({ theme }) => ({
  color: "#1a2744",
  marginRight: theme.spacing(1),
  transition: "all 0.3s ease",
  "&:hover": {
    color: "#0891b2",
    transform: "rotate(90deg)",
  },
}));

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState({});
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (event, menuName) => {
    setAnchorEl({ ...anchorEl, [menuName]: event.currentTarget });
  };

  const handleMenuClose = (menuName) => {
    setAnchorEl({ ...anchorEl, [menuName]: null });
  };

  const navItems = [
    { text: "Home", path: "/", hasDropdown: true },
    { text: "About Us", path: "/about" },
    { text: "Service", path: "/service", hasDropdown: true },
    { text: "Pages", path: "/pages", hasDropdown: true },
    { text: "Blog", path: "/blog", hasDropdown: true },
    { text: "Contact", path: "/contact" },
  ];

  const drawer = (
    <Box sx={{ width: 280 }} role="presentation">
      <Box sx={{ display: "flex", alignItems: "center", p: 2, justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* <LogoIcon>FB</LogoIcon> */}
          {/* <LogoText sx={{ fontSize: "1.5rem" }}>FinBest</LogoText> */}
          <img src="/images/cred.png" style={{width: "150px"}}/>
        </Box>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem button key={item.text}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="contained"
          sx={{
            background: "linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)",
            color: "white",
            fontWeight: 700,
            borderRadius: "50px",
            py: 1.5,
          }}
        >
          Get a quote
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      {!isMobile && (
        <TopBar>
          <Container maxWidth="xl">
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  📍 6391 Elgin St. Celina, 10299
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <SocialIcon size="small">
                  <Facebook sx={{ fontSize: "1.1rem" }} />
                </SocialIcon>
                <SocialIcon size="small">
                  <Twitter sx={{ fontSize: "1.1rem" }} />
                </SocialIcon>
                <SocialIcon size="small">
                  <LinkedIn sx={{ fontSize: "1.1rem" }} />
                </SocialIcon>
                <SocialIcon size="small">
                  <YouTube sx={{ fontSize: "1.1rem" }} />
                </SocialIcon>
              </Box>
            </Box>
          </Container>
        </TopBar>
      )}

      <HeaderAppBar scrolled={scrolled} elevation={0}>
        <Container maxWidth="xl">
          <Toolbar sx={{ padding: "0 !important", minHeight: "80px !important" }}>
            {isMobile && (
              <IconButton edge="start" onClick={handleDrawerToggle} sx={{ mr: 1, color: "#1a2744" }}>
                <MenuIcon />
              </IconButton>
            )}

            <LogoBox>
              {/* <LogoIcon>FB</LogoIcon>
              <LogoText>FinBest</LogoText> */}
               <img src="/images/cred.png" style={{width: "150px"}}/>
            </LogoBox>

            {!isMobile && (
              <>
                <Box sx={{ ml: 6, display: "flex", alignItems: "center", flexGrow: 1 }}>
                  {navItems.map((item) => (
                    <Box key={item.text}>
                      <NavButton
                        endIcon={item.hasDropdown ? <KeyboardArrowDown /> : null}
                        onClick={(e) => item.hasDropdown && handleMenuClick(e, item.text)}
                      >
                        {item.text}
                      </NavButton>
                      {item.hasDropdown && (
                        <Menu
                          anchorEl={anchorEl[item.text]}
                          open={Boolean(anchorEl[item.text])}
                          onClose={() => handleMenuClose(item.text)}
                          sx={{ mt: 1 }}
                        >
                          <MenuItem onClick={() => handleMenuClose(item.text)}>Option 1</MenuItem>
                          <MenuItem onClick={() => handleMenuClose(item.text)}>Option 2</MenuItem>
                          <MenuItem onClick={() => handleMenuClose(item.text)}>Option 3</MenuItem>
                        </Menu>
                      )}
                    </Box>
                  ))}
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <SearchIconButton>
                    <SearchIcon />
                  </SearchIconButton>

                  <ContactBox>
                    <PhoneIconBox>
                      <PhoneIcon sx={{ color: "white", fontSize: "1.2rem" }} />
                    </PhoneIconBox>
                    <Box>
                      <Typography variant="caption" sx={{ color: "#64748b", display: "block", lineHeight: 1.2 }}>
                        Requesting A Call:
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: "#1a2744", fontSize: "1rem" }}>
                        (629) 555-0129
                      </Typography>
                    </Box>
                  </ContactBox>

                  <GetQuoteButton endIcon={<ArrowForward />}>
                    Get a quote
                  </GetQuoteButton>
                </Box>
              </>
            )}
          </Toolbar>
        </Container>
      </HeaderAppBar>

      {isMobile && (
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{ "& .MuiDrawer-paper": { width: 280 } }}
        >
          {drawer}
        </Drawer>
      )}
    </>
  );
};

export default Header;