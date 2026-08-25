import {
  useEffect,
  useState
} from 'react';

import styles from './Header.module.css';
import { Link } from 'react-router-dom';

export default function Header({ logoSrc = '/images/common/logo.svg'}) {

  const [
    isMobileMenuOpen,
    setIsMobileMenuOpen
  ] = useState(false);

  /* 모바일 메뉴 열기 */
  function handleMobileMenuOpen() {
    setIsMobileMenuOpen(true);
  }

  /* 모바일 메뉴 닫기 */
  function handleMobileMenuClose() {
    setIsMobileMenuOpen(false);
  }


  return (
    <>
      {/* 헤더 영역 */}
      <header
        id="headerWrap"
        className={styles.headerWrap}
      >
        {/* 로고 영역 */}
        <div className={styles.headerLogoBox}>
          <h1>
            <a href="/">
              <img
                src={logoSrc}
                alt="the pullim"
              />
            </a>
          </h1>
        </div>
        {/* //로고 영역 */}

        {/* 메뉴 영역 */}
        <div className={styles.headerGnbBox}>
          {/* 네비게이션 영역 */}
          <nav
            className={styles.headerGnb}
            aria-label="주요 메뉴"
          >
            <ul className={styles.headerGnbList}>
              <li>
                <h2>
                  <Link to="/about">
                    ABOUT
                  </Link>
                </h2>
              </li>

              <li>
                <h2>
                  <Link to="/team">
                    TEAM
                  </Link>
                </h2>
              </li>

              <li>
                <h2>
                  <Link to="/service">
                    SERVICE
                  </Link>
                </h2>
              </li>

              <li>
                <h2>
                  <Link to="/news">
                    NEWS
                  </Link>
                </h2>
              </li>
            </ul>
          </nav>
          {/* //네비게이션 영역 */}
        </div>
        {/* //메뉴 영역 */}

        {/* 문의하기 링크 */}
        <Link
          to="/contact"
          className={styles.headerContactLink}
        >
          CONTACT
        </Link>
        {/* //문의하기 링크 */}

        {/* 모바일 메뉴 영역 */}
        <div
          id="mobileMenuWrap"
          className={`
            ${styles.mobileMenuWrap}
            ${isMobileMenuOpen
              ? styles.active
              : ''
            }
          `}
        >
          <button
            type="button"
            className={styles.mobileMenuBtn}
            aria-controls="mobileMenuBox"
            aria-expanded={isMobileMenuOpen}
            aria-label="모바일 메뉴 열기"
            onClick={handleMobileMenuOpen}
          />

          <div
            id="mobileMenuBox"
            className={styles.mobileMenuBox}
          >
            <nav
              className={styles.mobileMenuNav}
              aria-label="모바일 주요 메뉴"
            >
              <ul className={styles.mobileMenu}>
                <li>
                  <h2>
                    <a
                      href="#"
                      onClick={
                        handleMobileMenuClose
                      }
                    >
                      <span>[ 01 ]</span>
                      ABOUT
                    </a>
                  </h2>
                </li>

                <li>
                  <h2>
                    <a
                      href="#"
                      onClick={
                        handleMobileMenuClose
                      }
                    >
                      <span>[ 02 ]</span>
                      TEAM
                    </a>
                  </h2>
                </li>

                <li>
                  <h2>
                    <a
                      href="#"
                      onClick={
                        handleMobileMenuClose
                      }
                    >
                      <span>[ 03 ]</span>
                      SERVICE
                    </a>
                  </h2>
                </li>

                <li>
                  <h2>
                    <a
                      href="#"
                      onClick={
                        handleMobileMenuClose
                      }
                    >
                      <span>[ 04 ]</span>
                      NEWS
                    </a>
                  </h2>
                </li>

                <li>
                  <h2>
                    <a
                      href="#"
                      onClick={
                        handleMobileMenuClose
                      }
                    >
                      <span>[ 05 ]</span>
                      CONTACT
                    </a>
                  </h2>
                </li>
              </ul>
            </nav>

            <div className={styles.mobileInfoBox}>
              <div className={styles.mobileSnsBox}>
                <ul className={styles.mobileSnsList}>
                  <li>
                    <a href="#">
                      <img
                        src="/images/common/youtube_icon.svg"
                        alt="유튜브"
                      />
                    </a>
                  </li>

                  <li>
                    <a href="#">
                      <img
                        src="/images/common/instagram_icon.svg"
                        alt="인스타그램"
                      />
                    </a>
                  </li>

                  <li>
                    <a href="#">
                      <img
                        src="/images/common/blog_icon.svg"
                        alt="블로그"
                      />
                    </a>
                  </li>

                  <li>
                    <a href="#">
                      <img
                        src="/images/common/kakao_icon.svg"
                        alt="카카오톡"
                      />
                    </a>
                  </li>
                </ul>
              </div>

              <address>
                서울특별시 강남구 테헤란로 77길
                11-8, 1/2/3/4층
              </address>
            </div>

            <a
              href="#"
              className={styles.proposalDownload}
              download
            >
              <span>
                제안서 다운로드
              </span>
            </a>

            <button
              type="button"
              className={styles.mobileMenuCloseBtn}
              aria-label="모바일 메뉴 닫기"
              onClick={handleMobileMenuClose}
            />
          </div>
        </div>
        {/* //모바일 메뉴 영역 */}
      </header>
      {/* //헤더 영역 */}
    </>
  );
}