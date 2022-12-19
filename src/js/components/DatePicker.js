import BaseWidget from '../components/BaseWidget.js';
import utils from '../utils.js';
import { select, settings } from '../settings.js';

class DatePicker extends BaseWidget {
  constructor(wrapper) {
    const firstWorkDay = new Date().getDay() == 1 ? utils.addDays(new Date(), 1) : new Date();
    super(wrapper, utils.dateToStr(firstWorkDay));
    const thisWidget = this;
    thisWidget.minDate = firstWorkDay;
    thisWidget.dom.input = thisWidget.dom.wrapper.querySelector(select.widgets.datePicker.input);
    thisWidget.initPlugin();
  }
  initPlugin() {
    const thisWidget = this;
    thisWidget.maxDate = utils.addDays(thisWidget.minDate, settings.datePicker.maxDaysInFuture);
    // eslint-disable-next-line no-undef
    flatpickr(thisWidget.dom.input, {
      defaultDate: thisWidget.minDate,
      minDate: thisWidget.minDate,
      maxDate: thisWidget.maxDate,
      locale: {
        firstDayOfWeek: 1,
      },
      disable: [
        function (date) {
          return date.getDay() === 1;
        },
      ],
      onChange: function (selectedDates, dateStr) {
        thisWidget.value = dateStr;
      },
    });
  }
  parseValue(value) {
    return value;
  }

  isValid() {
    return true;
  }

  renderValue() {}
}

export default DatePicker;
