import React from 'react';
import classes from './styles.module.css'

export default function NavbarSocials(): JSX.Element {
  return (
    <div className={classes.navbar__container}>
      <a className={classes.navbar__button} href='https://discord.com/invite/d9BhxNWTsj' target='_blank'>
        <img src='/img/socials/discord.svg' alt="discord" />
        Discord
      </a>
      <a className={classes.navbar__button} href='https://github.com/neonlabsorg' target='_blank'>
        <img src='/img/socials/github.svg' alt="github" />
        Github
      </a>
    </div>
  )
}
