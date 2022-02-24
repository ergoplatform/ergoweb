/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/

import Link from "next/link"
import { FormattedMessage } from "react-intl"
import Image from 'next/image'
import { getIconComponentByName } from "../utils/icons-map"
import { BpsaaLogo, LogoWithText } from "./icons"

export default function Footer() {
    return (
        <footer>
            <div className="max-w-[1300px] mx-auto py-12 px-4">
                <div className="md:flex justify-between">
                    <div className="my-6 md:my-auto flex justify-center">
                        <Link href='/'><button><LogoWithText viewBox="0 0 213 82" className='w-40 md:w-52' /></button></Link>
                    </div>
                    <div className="grid overflow-hidden grid-cols-3 gap-2 text-red md:grid-cols-3 lg:grid-cols-10">
                        <div className="box mx-auto my-auto">{getIconComponentByName('Sigmaverse')}</div>
                        <div className="box mx-auto my-auto">{getIconComponentByName('Ergonaut')}</div>
                        <div className="box mx-auto my-auto">{getIconComponentByName('Github')}</div>
                        <div className="box mx-auto my-auto">{getIconComponentByName('Twitter')}</div>
                        <div className="box mx-auto my-auto">{getIconComponentByName('Youtube')}</div>
                        <div className="box mx-auto my-auto">{getIconComponentByName('Telegram')}</div>
                        <div className="box mx-auto my-auto">{getIconComponentByName('Discord')}</div>
                        <div className="box mx-auto my-auto">{getIconComponentByName('Reddit')}</div>
                        <div className="box mx-auto my-auto">{getIconComponentByName('Wechat')}</div>
                    </div>
                    <div className="my-6 md:my-auto flex justify-center">
                        <a className="text-brand-orange dark:text-brand-orange" href="mailto:team@ergoplatform.org">team@ergoplatform.org</a>
                    </div>
                </div>
                <div className="my-6 grid md:grid-cols-2 lg:grid-cols-6">
                    <div className="mx-1"><h3 className="font-button text-[#585858] dark:text-[#989898] my-4"><FormattedMessage defaultMessage="COMMUNITY" id="footer.community.title" /></h3>
                        <ul className="hidden md:block">
                            <li><FormattedMessage defaultMessage="Join our channels" id="footer.community.1" /></li>
                            <li><FormattedMessage defaultMessage="Sigmanauts" id="footer.community.2" /></li>
                            <li><FormattedMessage defaultMessage="Contribute to Ergo" id="footer.community.3" /></li>
                            <li><FormattedMessage defaultMessage="Ergo Foundation" id="footer.community.4" /></li>
                        </ul>
                    </div>
                    <div className="mx-1"><h3 className="font-button text-[#585858] dark:text-[#989898] my-4"><FormattedMessage defaultMessage="GET ERG" id="footer.getErg.title" /></h3>
                        <ul className="hidden md:block">
                            <li><FormattedMessage defaultMessage="Mining" id="footer.getErg.1" /></li>
                            <li><FormattedMessage defaultMessage="Mining Calculator" id="footer.getErg.2" /></li>
                            <li><FormattedMessage defaultMessage="Wallets" id="footer.getErg.3" /></li>
                            <li><FormattedMessage defaultMessage="Exchanges" id="footer.getErg.4" /></li>
                        </ul>
                    </div>
                    <div className="mx-1"><h3 className="font-button text-[#585858] dark:text-[#989898] my-4"><FormattedMessage defaultMessage="DISCOVER" id="footer.discover.title" /></h3>
                        <ul className="hidden md:block">
                            <li><FormattedMessage defaultMessage="Software Releases" id="footer.discover.1" /></li>
                            <li><FormattedMessage defaultMessage="Grants & Bounties" id="footer.discover.2" /></li>
                            <li><FormattedMessage defaultMessage="FAQ" id="footer.discover.3" /></li>
                            <li><FormattedMessage defaultMessage="Ergo Explorer" id="footer.discover.4" /></li>
                            <li><FormattedMessage defaultMessage="Documents" id="footer.discover.5" /></li>
                        </ul>
                    </div>
                    <div className="mx-1"><h3 className="font-button text-[#585858] dark:text-[#989898] my-4"><FormattedMessage defaultMessage="ECOSYSTEM" id="footer.ecosystem.title" /></h3>
                        <ul className="hidden md:block">
                            <li><FormattedMessage defaultMessage="DApps" id="footer.ecosystem.1" /></li>
                            <li><FormattedMessage defaultMessage="Roadmap" id="footer.ecosystem.2" /></li>
                            <li><FormattedMessage defaultMessage="Ergonaut" id="footer.ecosystem.3" /></li>
                            <li><FormattedMessage defaultMessage="Ergo Raffle" id="footer.ecosystem.4" /></li>
                            <li><FormattedMessage defaultMessage="Real Life Ergo" id="footer.ecosystem.5" /></li>
                        </ul>
                    </div>
                    <div className="mx-1"><h3 className="font-button text-[#585858] dark:text-[#989898] my-4"><FormattedMessage defaultMessage="BLOG" id="footer.blog.title" /></h3></div>
                    <div className="mx-1"><h3 className="font-button text-[#585858] dark:text-[#989898] my-4"><FormattedMessage defaultMessage="NEWS" id="footer.news.title" /></h3></div>
                </div>
                <div className="md:flex">
                    <div className="my-6 order-2">{<BpsaaLogo viewBox="0 0 227 102" width="158" height="88" />}</div>
                    <div className="flex-grow md:flex-grow my-auto">
                        <ul className="inline-flex">
                            <li className="mr-6">Ergo Platform &copy; {new Date().getFullYear()}</li>
                            <li className="mr-6"><FormattedMessage defaultMessage="Privacy Policy" id="footer.privacyPolicy" /></li>
                            <li className="mr-6"><FormattedMessage defaultMessage="Legal" id="footer.legal" /></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}