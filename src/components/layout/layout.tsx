import { CssBaseline, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useRouter } from 'next/router';
import React, { useState, useEffect, ReactElement } from 'react';

import Header from './header';

import { CtfFooterGql } from '@ctf-components/ctf-footer/ctf-footer-gql';
import { CtfMobileMenuGql } from '@src/ctf-components/ctf-mobile-menu/ctf-mobile-menu-gql';

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    ...theme.typography.body1,
    flex: '1 0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

interface LayoutPropsInterface {
  preview: boolean;
  children: ReactElement[];
}

const Layout: React.FC<LayoutPropsInterface> = ({ children }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const classes = useStyles();
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setMenuOpen(false);
    });

    router.events.on('routeChangeComplete', () => {
      if (document.activeElement === null) {
        return;
      }

      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    });
  }, [router.events]);

  return (
    <>
      <CssBaseline />
      <Header onMenuClick={() => setMenuOpen(true)} />

      {/* content */}
      <div className={classes.content}>{children}</div>

      <CtfFooterGql />

      <CtfMobileMenuGql
        isOpen={isMenuOpen}
        onOpenChange={(newOpen: boolean) => {
          setMenuOpen(newOpen);
        }}
      />
    </>
  );
};

export default Layout;
