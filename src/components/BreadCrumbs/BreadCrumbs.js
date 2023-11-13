import Link from "next/link";
import * as React from "react";

export default function BreadCrumb(props) {
  return (
    <div className="breadcrumb">
      <ol
          className="flex gap-4 items-center"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
            {props?.Category && (
          <>
            <li
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <Link
                itemProp="item"
                aria-label="Home"
                href="/"
              >
                <span itemProp="name">{"Home"}</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <li>/</li>
            <li
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <Link
                itemProp="item"
                aria-label={props?.Category}
                href={`/blog/${props?.Category}`}
              >
                <span itemProp="name">{props?.Category}</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <li>/</li>
            <li
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <Link
                style={{ pointerEvents: "none" }}
                aria-label={props?.Title}
                href="#"
                itemProp="item"
              >
                <span className="anchor" itemProp="name">
                  {props?.Title}
                </span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
          </>
          )}
          {props?.Location && (
          <>
            <li
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <Link
                itemProp="item"
                aria-label="Home"
                href="/"
              >
                <span itemProp="name">{"Home"}</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <li>/</li>
            <li
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <Link
                style={{ pointerEvents: "none" }}
                aria-label={props?.Location}
                href="#"
                itemProp="item"
              >
                <span className="anchor" itemProp="name">
                  {props?.Location}
                </span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
          </>
          )}
        </ol>
    </div>
  );
}
