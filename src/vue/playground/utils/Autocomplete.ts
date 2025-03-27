import { aframeAttributes, aframeComponentsAndPrimitives, aframeEvents, aframeProperties } from "../constants/aframeAutocomplete"
import { atRulesCSS, pseudoClassesCSS, tagsCSS, valuesCSS } from "../constants/cssAutocomplete"
import { BoolHTML, CharsetsHTML, EncsHTML, EventAttributesHTML, GlobalAttrsHTML, MethodsHTML, TagsHTML, TargetsHTML } from "../constants/htmlAutocomplete"
import { keywordsJS } from "../constants/jsAutocomplete"
import { sdsComponentsAndPrimitives, sdsEvents, sdsProperties } from "../constants/sdsAutocomplete"
import { AutocompleteMatch } from "../types/autocomplete"
import { FileExtensions } from "../types/fileType"

function mapAutocompleteArrayElements(events: string[], type: string) {
  return events.map(e => {
    return {
      type: type,
      value: e
    }
  })
}

function mapAutocompleteObjectElements(attr, type: string) {
  return Object.keys(attr).map(a => {
    return {
      type: type,
      value: a
    }
  })
}

function getHTMLAutocomplete() {
  return [
    ...mapAutocompleteArrayElements(TargetsHTML, 'target'),
    ...mapAutocompleteArrayElements(CharsetsHTML, 'charset'),
    ...mapAutocompleteArrayElements(MethodsHTML, 'method'),
    ...mapAutocompleteArrayElements(EncsHTML, 'encs'),
    ...mapAutocompleteArrayElements(BoolHTML, 'bool'),
    ...mapAutocompleteObjectElements(TagsHTML, 'tag'),
    ...mapAutocompleteObjectElements(GlobalAttrsHTML, 'attribute'),
    ...mapAutocompleteArrayElements(EventAttributesHTML, 'attribute'),
  ]
}

function getCSSAutocomplete() {
  return [
    ...pseudoClassesCSS,
    ...valuesCSS,
    ...tagsCSS,
    ...atRulesCSS
  ]
}

function getJSAutocomplete() {
  return keywordsJS
}

export function getSDSAutocomplete() {
  return [
    ...sdsComponentsAndPrimitives,
    ...sdsEvents,
    ...sdsProperties
  ]
}

export function getAframeAutocomplete() {
  return [
    ...aframeAttributes,
    ...aframeComponentsAndPrimitives,
    ...aframeEvents,
    ...aframeProperties
  ]
}

export function getAutompleteByFileExtension(extension: FileExtensions): AutocompleteMatch[] {
  if (extension === FileExtensions.CSS) return getCSSAutocomplete()
  if (extension === FileExtensions.JS || extension === FileExtensions.TS) return getJSAutocomplete()
  return [
    ...getHTMLAutocomplete(),
    ...getCSSAutocomplete(),
    ...getJSAutocomplete()
  ]
}
