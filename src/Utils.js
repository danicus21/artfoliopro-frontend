import gsap from 'gsap'
import Auth from './Auth'

class Utils {

  isMobile(){
    let viewportWidth = window.innerWidth
    if(viewportWidth <= 768){
      return true
    }else{
      return false
    }
  }

  pageIntroAnim(){
    const pageContent = document.querySelector('.page-content')
    if(!pageContent) return
    gsap.fromTo(pageContent, {opacity: 0, y: -12}, {opacity: 1, y: 0, ease: 'power2.out', duration: 0.3})
  }

  async fetchData(url, options = {}){
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        ...options.headers
      }
    })
    
    if(!response.ok){
      const error = await response.json()
      throw new Error(error.message || `Error: ${response.status}`)
    }
    
    return response.json()
  }
}

export default new Utils()