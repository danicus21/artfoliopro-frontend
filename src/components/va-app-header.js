import { LitElement, html, css } from 'lit'
import {anchorRoute, gotoRoute} from './../Router'
import Auth from './../Auth'
import App from './../App'

customElements.define('va-app-header', class AppHeader extends LitElement {
  constructor(){
    super()    
  }

  static get properties(){
    return {
      title: {
        type: String
      },
      user: {
        type: Object
      }
    }
  }

  firstUpdated(){
    super.firstUpdated()
    this.navActiveLinks()    
  }

  navActiveLinks(){ 
    const currentPath = window.location.pathname
    const navLinks = document.querySelectorAll('.app-top-nav a, .app-side-menu-items a')
    navLinks.forEach(navLink => {
      if(navLink.href.slice(-1) == '#') return
      if(navLink.pathname === currentPath){   
        navLink.classList.add('active')
      }
    })
  }

  hamburgerClick(){  
    const appMenu = document.querySelector('.app-side-menu')
    appMenu.show()
  }
  
  menuClick(e){
    e.preventDefault()
    const pathname = e.target.closest('a').pathname
    const appSideMenu = document.querySelector('.app-side-menu')
    // hide appMenu
    appSideMenu.hide()
    appSideMenu.addEventListener('sl-after-hide', () => {
      // goto route after menu is hidden
      gotoRoute(pathname)
    })
  }

  createRenderRoot(){
    return this
  }

  render(){    
    return html`
    <style>      
      * {
        box-sizing: border-box;
      }
      .app-header {
        background: #fff;  /* White background */
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        height: var(--app-header-height);
        color: #000;  /* Black text */
        display: flex;
        z-index: 9;
        box-shadow: 0 1px 0 rgba(0,0,0,0.1);  /* Subtle bottom border */
        align-items: center;
        border-bottom: 1px solid var(--gray-medium);
      }
      

      .app-header-main {
        flex-grow: 1;
        display: flex;
        align-items: center;
      }

      .app-header-main::slotted(h1){
        color: #000;  /* Black text */
      }

      .app-logo a {
        color: var(--brand-color);  /* Blue logo */
        text-decoration: none;
        font-weight: 600;
        font-size: 1.4em;
        padding: .6em;
        display: inline-block;        
      }

      .app-logo img {
        width: 90px;
      }
      
      .hamburger-btn::part(base) {
        color: #000;  /* Black hamburger */
      }

      .app-top-nav {
        display: flex;
        height: 100%;
        align-items: center;
      }

      .app-top-nav a {
        display: inline-block;
        padding: .8em;
        text-decoration: none;
        color: #000;  /* Black nav links */
        font-weight: 500;
        transition: color 0.2s ease;
      }

      .app-top-nav a:hover {
        color: var(--brand-color);
      }
      
      .app-side-menu-items a {
        display: block;
        padding: .7em;
        text-decoration: none;
        font-size: 1.1em;
        color: #333;
        transition: all 0.2s ease;
      }

      .app-side-menu-items a:hover {
        color: var(--brand-color);
        padding-left: 1.2em;
      }

      .app-side-menu-logo {
        width: 120px;
        margin-bottom: 1em;
        position: absolute;
        top: 2em;
        left: 1.5em;
      }

      .page-title {
        color: #000;  /* Black title */
        margin-right: 0.5em;
        margin-bottom: 0em;
        font-size: var(--app-header-title-font-size);
        font-weight: 500;
      }

      /* Logo text when no image */
      .app-logo-text {
        font-size: 1.5em;
        font-weight: 600;
        color: var(--brand-color);
        padding: 0 1em;
      }

      /* active nav links */
      .app-top-nav a.active,
      .app-side-menu-items a.active {
        font-weight: bold;
        color: var(--brand-color);
      }

      /* RESPONSIVE - MOBILE ------------------- */
      @media all and (max-width: 768px){       
        
        .app-top-nav {
          display: none;
        }
      }

    </style>

    <header class="app-header">
      <sl-icon-button class="hamburger-btn" name="list" @click="${this.hamburgerClick}" style="font-size: 1.5em;"></sl-icon-button>       
      
      <div class="app-header-main">
        <div class="app-logo-text">ArtfolioPro</div>
        ${this.title ? html`
          <h1 class="page-title">${this.title}</h1>
        `:``}
        <slot></slot>
      </div>

      <nav class="app-top-nav">
        <a href="/home" @click="${anchorRoute}">Home</a>
        <a href="/artworks" @click="${anchorRoute}">Browse Art</a>
        <a href="/artists" @click="${anchorRoute}">Artists</a>        
        <sl-dropdown>
          <a slot="trigger" href="#" @click="${(e) => e.preventDefault()}">
            <sl-avatar style="--size: 24px;" image=${(this.user && this.user.avatar) ? `${App.apiBase}/images/${this.user.avatar}` : ''}></sl-avatar> ${this.user && this.user.firstName}
          </a>
          <sl-menu>            
            <sl-menu-item @click="${() => gotoRoute('/profile')}">Profile</sl-menu-item>
            <sl-menu-item @click="${() => gotoRoute('/editProfile')}">Edit Profile</sl-menu-item>
            <sl-menu-item @click="${() => Auth.signOut()}">Sign Out</sl-menu-item>
          </sl-menu>
        </sl-dropdown>
      </nav>
    </header>

    <sl-drawer class="app-side-menu" placement="start" class="drawer">
      <div style="text-align: center; padding: 2em 0;">
        <h2 style="color: var(--brand-color); margin: 0;">ArtfolioPro</h2>
      </div>
      <nav class="app-side-menu-items">
        <a href="/home" @click="${this.menuClick}">Home</a>
        <a href="/artworks" @click="${this.menuClick}">Browse Artworks</a>
        <a href="/artists" @click="${this.menuClick}">Browse Artists</a>   
        <a href="/profile" @click="${this.menuClick}">Profile</a>
        <a href="#" @click="${() => Auth.signOut()}">Sign Out</a>
      </nav>  
    </sl-drawer>
    `
  }
  
})