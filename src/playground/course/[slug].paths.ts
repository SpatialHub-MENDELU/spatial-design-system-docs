import { VANILLA_JS_COURSE, VUE_COURSE } from "../../vue/playground/constants/courses"

export default {
  paths() {
    return [
      { params: { slug: VANILLA_JS_COURSE }},
      { params: { slug: VUE_COURSE }}
    ]
  }
}