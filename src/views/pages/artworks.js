import App from '../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'

class ArtworksView {
  async init(){
    document.title = 'Browse Artworks'    
    this.artworks = null
    await this.getArtworks()
    this.render()    
    Utils.pageIntroAnim()
  }

  async getArtworks(){
    try {
      this.artworks = await Utils.fetchData(`${App.apiBase}/artwork`)
    } catch(err){
      console.log(err)
    }
  }

  render(){
    const template = html`
      <va-app-header title="" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">        
        <h1>Browse Artworks</h1>
        <div class="artworks-grid">
          ${this.artworks == null ? html`
            <sl-spinner></sl-spinner>
          ` : html`
            ${this.artworks.map(artwork => html`
              <sl-card>
                <img slot="image" src="${App.apiBase}/images/${artwork.image}" />
                <strong>${artwork.title}</strong><br>
                <sl-badge>${artwork.category}</sl-badge>
              </sl-card>
            `)}
          `}
        </div>
      </div>      
    `
    render(template, App.rootEl)
  }
}

export default new ArtworksView()