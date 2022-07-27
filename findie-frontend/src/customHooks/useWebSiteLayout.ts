// @ts-nocheck
import { useContext, useState } from 'react'
import { CurrentViewContext } from '../context/WebSite/CurrentViewContext'

const elementHeight = (id: string) => {
  const height = document.getElementById(id) && document.getElementById(id).getBoundingClientRect().height
  return height
}

export const useWebSiteLayout = () => {
  const { view, setView } = useContext(CurrentViewContext)
  const [scrollTopOpen, setScrollTopOpen] = useState(false)

  const currentScroll = (e: any) => {
    const scroll = Number(e.target.scrollTop)
    scroll < 100 && setScrollTopOpen(false)
    scroll >= 100 && setScrollTopOpen(true)
    const pageActions: { [key: string]: () => void } = {
      home: () => homePageStyles(scroll),
      about_us: () => aboutUsStyles(scroll),
      how_works: () => howWorksStyles(scroll),
      our_freelancers: () => freelancersStyles(scroll),
      our_clients: () => clientsStyles(scroll),
    }
    pageActions[view.path] && pageActions[view.path]()
  }

  const homePageStyles = (scroll: number) => {
    const { bgColor, textColor, textColor2 } = setHomePageBackgound(scroll)
    if (view.bgColor === bgColor) return
    setView({ ...view, bgColor, textColor, textColor2 })
  }

  const aboutUsStyles = (scroll: number) => {
    const { bgColor, textColor, textColor2 } = setAboutUsBackgound(scroll)
    if (view.bgColor === bgColor) return
    setView({ ...view, bgColor, textColor, textColor2 })
  }

  const howWorksStyles = (scroll: number) => {
    const { bgColor, textColor, textColor2 } = setHowWorksBackgound(scroll)
    if (view.bgColor === bgColor) return
    setView({ ...view, bgColor, textColor, textColor2 })
  }

  const freelancersStyles = (scroll: number) => {
    const { bgColor, textColor, textColor2 } = setFreelancersBackgound(scroll)
    if (view.bgColor === bgColor) return
    setView({ ...view, bgColor, textColor, textColor2 })
  }

  const clientsStyles = (scroll: number) => {
    const { bgColor, textColor, textColor2 } = setClientsBackgound(scroll)
    if (view.bgColor === bgColor) return
    setView({ ...view, bgColor, textColor, textColor2 })
  }

  const setHomePageBackgound = (scl: number) => {
    const introHeight = elementHeight('home_page_intro')
    const categoriesHeight = elementHeight('our_categories')
    const roadmapHeight = elementHeight('roadmap')
    const freelancersHeight = elementHeight('featured_freelancers')
    const brandsHeight = elementHeight('freelancers_brands')
    const section = {
      one: introHeight,
      two: introHeight + categoriesHeight,
      three: introHeight + categoriesHeight + roadmapHeight,
      four: introHeight + categoriesHeight + roadmapHeight + freelancersHeight,
      five: introHeight + categoriesHeight + roadmapHeight + freelancersHeight + brandsHeight,
    }
    if (scl <= section.one / 2) return { bgColor: 'web-bg-white', textColor: 'text-black', textColor2: 'text-white' }
    if (scl >= section.one / 2 && scl <= section.two)
      return { bgColor: 'web-bg-white', textColor: 'text-black', textColor2: 'text-white' }
    if (scl >= section.two / 2 && scl <= section.three)
      return { bgColor: 'web-bg-black', textColor: 'text-white', textColor2: 'text-black' }
    if (scl >= section.three / 2 && scl <= section.four)
      return { bgColor: 'web-bg-white', textColor: 'text-black', textColor2: 'text-white' }
    if (scl >= section.four / 2 && scl <= section.five)
      return { bgColor: 'web-bg-black', textColor: 'text-white', textColor2: 'text-black' }
    if (scl >= section.five / 2) return { bgColor: 'web-bg-sea-blue', textColor: 'text-white', textColor2: 'text-sea-blue' }
  }

  const setAboutUsBackgound = (scl: number) => {
    const introHeight = elementHeight('about_us_intro')
    const aboutUsHeight = elementHeight('our_history')
    const whyFindieHeight = elementHeight('why_findie')
    const section = {
      one: introHeight,
      two: introHeight + aboutUsHeight,
      three: introHeight + aboutUsHeight + whyFindieHeight,
    }
    if (scl <= section.one / 2) return { bgColor: 'web-bg-rose', textColor: 'text-black', textColor2: 'text-rose' }
    if (scl >= section.one / 2 && scl <= section.two)
      return { bgColor: 'web-bg-black', textColor: 'text-white', textColor2: 'text-black' }
    if (scl >= section.two / 2 && scl <= section.three)
      return { bgColor: 'web-bg-white', textColor: 'text-black', textColor2: 'text-white' }
    if (scl >= section.three / 2) return { bgColor: 'web-bg-rose', textColor: 'text-black', textColor2: 'text-rose' }
  }

  const setHowWorksBackgound = (scl: number) => {
    const introHeight = elementHeight('about_us_intro')
    const freelancerHeight = elementHeight('freelancer_selection')
    const section = {
      one: introHeight,
      two: introHeight + freelancerHeight,
    }
    if (scl <= section.one / 2) return { bgColor: 'web-bg-soft-blue', textColor: 'text-white', textColor2: 'text-soft-blue' }
    if (scl >= section.one / 2 && scl <= section.two)
      return { bgColor: 'web-bg-black', textColor: 'text-white', textColor2: 'text-black' }
    if (scl >= section.two / 2) return { bgColor: 'web-bg-soft-blue', textColor: 'text-white', textColor2: 'text-soft-blue' }
  }

  const setFreelancersBackgound = (scl: number) => {
    const introHeight = elementHeight('our_freelancers_intro')
    const whatYouGetHeight = elementHeight('what_you_get')
    const whatFreelancerWinHeight = elementHeight('what_freelancers_win')
    const freelancersPriceHeight = elementHeight('freelancer_price')
    const section = {
      one: introHeight,
      two: introHeight + whatYouGetHeight,
      three: introHeight + whatYouGetHeight + whatFreelancerWinHeight,
      four: introHeight + whatYouGetHeight + whatFreelancerWinHeight + freelancersPriceHeight,
    }
    if (scl <= section.one / 2)
      return { bgColor: 'web-bg-light-orange', textColor: 'text-black', textColor2: 'text-light-orange' }
    if (scl >= section.one / 2 && scl <= section.two)
      return { bgColor: 'web-bg-white', textColor: 'text-black', textColor2: 'text-white' }
    if (scl >= section.two / 2 && scl <= section.three)
      return { bgColor: 'web-bg-white', textColor: 'text-black', textColor2: 'text-white' }
    if (scl >= section.three / 2 && scl <= section.four)
      return { bgColor: 'web-bg-light-orange', textColor: 'text-black', textColor2: 'text-light-orange' }
    if (scl >= section.four / 2) return { bgColor: 'web-bg-white', textColor: 'text-black', textColor2: 'text-white' }
  }

  const setClientsBackgound = (scl: number) => {
    const introHeight = elementHeight('our_clients_intro')
    const howWorksHeight = elementHeight('how_works')
    const benefitsHeight = elementHeight('clients_benefits')
    const section = {
      one: introHeight,
      two: introHeight + howWorksHeight,
      three: introHeight + howWorksHeight + benefitsHeight,
    }
    if (scl <= section.one / 2) return { bgColor: 'web-bg-sea-blue', textColor: 'text-white', textColor2: 'text-sea-blue' }
    if (scl >= section.one / 2 && scl <= section.two)
      return { bgColor: 'web-bg-duo-2', textColor: 'text-white', textColor2: 'text-black' }
    if (scl >= section.two / 2 && scl <= section.three)
      return { bgColor: 'web-bg-sea-blue', textColor: 'text-white', textColor2: 'text-sea-blue' }
    if (scl >= section.three / 2) return { bgColor: 'web-bg-white', textColor: 'text-black', textColor2: 'text-white' }
  }

  return { view, scrollTopOpen, setView, currentScroll }
}
