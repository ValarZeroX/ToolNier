//app/i18n/routes.ts
"use client";

import { useEffect, useState } from "react";
import i18next from "i18next";
import {
  initReactI18next,
  useTranslation as useTranslationOrg,
} from "react-i18next";
import { useCookies } from "react-cookie";
import resourcesToBackend from "i18next-resources-to-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { getOptions, languages, cookieName } from "./settings";

const runsOnServerSide = typeof window === "undefined";

// Initialize i18next only once
if (!i18next.isInitialized) {
  i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(
      resourcesToBackend(
        (lng: string, ns: string) => import(`./locales/${lng}/${ns}.json`)
      )
    )
    .init({
      ...getOptions(),
      detection: {
        order: ["cookie", "path", "htmlTag", "navigator"],
        lookupCookie: cookieName,
        caches: ["cookie"],
      },
      preload: runsOnServerSide ? languages : [],
    });
}

export function useTranslation(lng: string, ns: string | string[], options?: {}) {
  const [cookies, setCookie] = useCookies([cookieName]);
  const ret = useTranslationOrg(ns, options);
  const { i18n } = ret;

  useEffect(() => {
    if (lng && i18n.resolvedLanguage !== lng) {
      i18n.changeLanguage(lng).then(() => {
        setCookie(cookieName, lng, { path: "/" });
      });
    }
  }, [lng, i18n, setCookie]);

  return ret;
}