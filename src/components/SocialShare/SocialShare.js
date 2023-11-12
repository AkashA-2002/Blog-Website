import React from "react";
import Link from "next/link";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faLinkedinIn,
  faFacebookF,
  faPinterestP,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";

export default function SocialShare(props) {
  const { asPath } = useRouter();
  let location = `https://checkout-blogs.vercel.app${asPath}`;
  return (
    <>
      <section
        className={`social-share-section ${
          props?.Class ? props?.Class : ""
        }`}
      >
        <div className="container mx-auto">
          <div className="share-section">
            <h3
              style={{
                marginBottom: "8px",
                fontSize: "25px",
                color: "var(--black)",
              }}
            >
              Share with your Colleagues and Peers!
            </h3>
            <div className="theme-social-share-buttons">
              {props?.data?.fields?.shareEmail === true && (
                <Link
                  href={`mailto:?subject=SCube social share&body=Check out this site ${location}`}
                  aria-label="Email"
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faEnvelope} className="social-icon" />
                  <span>Email</span>
                </Link>
              )}
              {props?.data?.fields?.shareTweet === true && (
                <Link
                  href={`https://twitter.com/intent/tweet?text=SCube social share&url=${location}`}
                  aria-label="Twitter"
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faTwitter} className="social-icon" />
                  <span>Twitter</span>
                </Link>
              )}
              {props?.data?.fields?.shareLinkedIn === true && (
                <Link
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${location}`}
                  aria-label="Share"
                  target="_blank"
                >
                  <FontAwesomeIcon
                    icon={faLinkedinIn}
                    className="social-icon"
                  />
                  <span>Share</span>
                </Link>
              )}
              {props?.data?.fields?.shareFacebook === true && (
                <Link
                  href={`https://www.facebook.com/sharer/sharer.php?u=${location}`}
                  aria-label="Facebook"
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faFacebookF} className="social-icon" />
                  <span>Facebook</span>
                </Link>
              )}
              {props?.data?.fields?.sharePinterest === true && (
                <Link
                  href={`https://www.pinterest.com/pin/create/button/?url=${location}`}
                  aria-label="Pinterest"
                  target="_blank"
                >
                  <FontAwesomeIcon
                    icon={faPinterestP}
                    className="social-icon"
                  />
                  <span>Pinterest</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
