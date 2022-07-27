import { useWebSiteLayout } from '../../customHooks/useWebSiteLayout'
import useExecuteScroll from '../../customHooks/useExecuteScroll'
import { useScrollToTop } from '../../customHooks/useScrollToTop'

import Header from './Header'
import LateralMenu from './LateralMenu'
import Footer from './Footer'

import { CurrentViewContextProvider } from '../../context/WebSite/CurrentViewContext'
import WebSiteRouter from '../../appRouter/WebSiteRouter'
import ScrollToTop from '../../shared/ScrollToTop/ScrollToTop'

const WebSiteLayout: React.FC = () => {
  return (
    <CurrentViewContextProvider>
      <Layout />
    </CurrentViewContextProvider>
  )
}

export default WebSiteLayout

const Layout: React.FC = () => {
  const { view, scrollTopOpen, currentScroll } = useWebSiteLayout()
  const scroll = useExecuteScroll()
  useScrollToTop('web_layout')

  return (
    <div
      className={`h-screen overflow-x-hidden overflow-y-auto relative pt-11 ${view.bgColor}`}
      onScroll={currentScroll}
      id={'web_layout'}
    >
      <div ref={scroll.elementRef}>
        <Header />
      </div>
      <WebSiteRouter />
      <Footer />
      <LateralMenu />
      <ScrollToTop open={scrollTopOpen} onClick={scroll.execute} />
    </div>
  )
}
