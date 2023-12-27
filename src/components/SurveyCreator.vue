<template>
    <div id="creatorElement" />
</template>

<script>
    import $ from "jquery";
    import "jquery-ui-dist/jquery-ui.css";

import "easy-autocomplete/dist/easy-autocomplete.css";

import "jquery-bar-rating/jquery.barrating.js";
import "jquery-bar-rating/dist/themes/fontawesome-stars.css";

import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-datepicker/dist/css/bootstrap-datepicker.css";

import moment from "moment";
import "bootstrap-datepicker/dist/js/bootstrap-datepicker.js"

import "bootstrap-slider/dist/css/bootstrap-slider.css";

import Inputmask from 'inputmask';
import 'inputmask/dist/inputmask/phone-codes/phone';

import noUiSlider from 'nouislider';
import "nouislider/distribute/nouislider.min.css";

import select2Init from 'select2';
import 'select2/dist/css/select2.min.css';

import Sortable from 'sortablejs';

    import * as Survey from "survey-knockout";
    import * as SurveyCreator from "survey-creator";
    import * as widgets from "surveyjs-widgets";

    import 'bootstrap/dist/css/bootstrap.css';
    import "survey-knockout/survey.css";
    import "survey-creator/survey-creator.css";
    import "./index.css";

    SurveyCreator.StylesManager.applyTheme("bootstrap");

    export default {
        name: "surveyjs-creator-component",
        mounted() {
            window["$"] = window["jQuery"] = $;
require("jquery-ui-dist/jquery-ui.js");
require("easy-autocomplete/dist/jquery.easy-autocomplete.js");

//ckeditor
const self = this;
if (self.alreadyRendered) return;
const script = document.createElement("script");
script.src = "https://cdn.ckeditor.com/4.14.1/standard/ckeditor.js";
document.head.append(script);

script.onload = function () {
    const CKEDITOR = window.CKEDITOR;
    self.alreadyRendered = true;
    if (self.forceUpdate) self.forceUpdate();  
};
 

require("emotion-ratings/dist/emotion-ratings.js");

select2Init();

            widgets.prettycheckbox(Survey);
widgets.select2(Survey, $);
widgets.inputmask(Survey);
widgets.jquerybarrating(Survey, $);
widgets.jqueryuidatepicker(Survey, $);
widgets.nouislider(Survey);
widgets.select2tagbox(Survey, $);
widgets.sortablejs(Survey);
widgets.ckeditor(Survey);
widgets.autocomplete(Survey, $);
widgets.bootstrapslider(Survey);


            var creatorOptions = {questionTypes : ["text", "checkbox", "radiogroup", "dropdown"]};
var creator = new SurveyCreator.SurveyCreator("creatorElement", creatorOptions);
creator.showToolbox = "right";
creator.showPropertyGrid = "right";
creator.rightContainerActiveItem("toolbox");

            

            

            
        }
    };
</script>

<style scoped>
</style>
