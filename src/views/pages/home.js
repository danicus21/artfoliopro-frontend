import App from './../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute } from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'

class HomeView {
  init(){    
    console.log('HomeView.init')
    document.title = 'ArtfolioPro - Home'    
    this.render()    
    Utils.pageIntroAnim()    
  }

  render(){
    const template = html`
      <va-app-header title="" user=${JSON.stringify(Auth.currentUser)}></va-app-header>
      
      <div class="page-content">
        <div class="home-hero">
          <h1 class="anim-in">Welcome back, ${Auth.currentUser.firstName}!</h1>
          <p class="hero-text">Discover amazing artwork from talented artists</p>
        </div>

        <div class="home-actions">
          <sl-button variant="primary" size="large" @click=${() => gotoRoute('/artworks')}>
            <sl-icon slot="prefix" name="image"></sl-icon>
            Browse Artworks
          </sl-button>
          
          <sl-button variant="default" size="large" @click=${() => gotoRoute('/artists')}>
            <sl-icon slot="prefix" name="people"></sl-icon>
            Discover Artists
          </sl-button>
        </div>

        <div class="home-categories">
          <h2>Popular Categories</h2>
          <div class="category-grid">
            <sl-card class="category-card">
              <strong>Digital Art</strong>
            </sl-card>
            <sl-card class="category-card">
              <strong>Illustration</strong>
            </sl-card>
            <sl-card class="category-card">
              <strong>Photography</strong>
            </sl-card>
            <sl-card class="category-card">
              <strong>Traditional Art</strong>
            </sl-card>
          </div>
        </div>
      </div>

      <style>
        .home-hero {
          text-align: center;
          padding: 3rem 0;
        }
        .hero-text {
          font-size: 1.2rem;
          color: var(--gray-dark);
          margin-top: 0.5rem;
        }
        .home-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin: 2rem 0;
        }
        .home-categories {
          margin-top: 3rem;
        }
        .category-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-top: 1rem;
        }
        .category-card {
          cursor: pointer;
          text-align: center;
          padding: 2rem;
          transition: transform 0.2s;
        }
        .category-card:hover {
          transform: translateY(-2px);
        }
      </style>
    `
    render(template, App.rootEl)
  }
}

export default new HomeView()