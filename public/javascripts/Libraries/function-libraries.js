function requestDataLoading(url, options, callback, fallout) {
  $.ajax({
    type: options.method,
    url: url,
    data: options.params,
    beforeSend: function (jqXHR, settings) {
      iziToast.info({
        message: 'Loading ...',
        timeout: 0,
        toastOnce: true
      })
    },
    success: function (data) {
      iziToast.destroy()
      callback(data)
    },
    error: function (xhr, textStatus, err) {
      iziToast.destroy()
      if (xhr.status === 408) {
        iziToast.error({
          title: "Sorry !",
          message: "Request Timeout !",
          timeout: 4000
        })
      }
      if (fallout) {
        fallout(xhr)
      } else {
        iziToast.error({
          title: xhr.statusText,
          message: xhr.responseText,
          timeout: 4000
        })
      }
    }
  })
}

function requestData(url, options, callback, fallout) {
  $.ajax({
    type: options.method,
    url: url,
    data: options.params,
    success: function (data) {
      // iziToast.destroy()
      callback(data)
    },
    error: function (xhr, textStatus, err) {
      iziToast.destroy()
      if (xhr.status === 408) {
        iziToast.error({
          title: "Sorry !",
          message: "Request Timeout !",
          timeout: 4000
        })
      }
      if (fallout) {
        fallout(xhr)
      } else {
        iziToast.error({
          title: xhr.statusText,
          message: xhr.responseText,
          timeout: 4000
        })
      }
    }
  })
}

function convertTimestamp(timestamp) {
  let d = new Date(timestamp),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear(),
    hour = '' + d.getHours(),
    minute = '' + d.getMinutes(),
    second = '' + d.getSeconds()
  if (month.length < 2)
    month = '0' + month
  if (day.length < 2)
    day = '0' + day
  if (hour.length < 2)
    hour = '0' + hour
  if (minute.length < 2)
    minute = '0' + minute
  if (second.length < 2)
    second = '0' + second
  return [year, month, day].join('/') + ' ' + [hour, minute, second].join(':')
}

function currencyFormat(num) {
  var format = new Intl.NumberFormat('en-ID', {
    style: 'currency',
    currency: 'IDR'
  })
  return format.format(num)
}

function unCurrencyFormat(val) {
  if (val) {
    return Number(val.replace(/[^0-9.-]+/g, ''))
  } else {
    return 0
  }
}

function isNumber(evt) {
  evt = (evt) || window.event
  var charCode = (evt.which) ? evt.which : evt.keyCode
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false
  }
  return true
}

function addSuccessNotification(title, message, timer) {
  iziToast.success({
    title: title,
    message: message,
    timeout: timer
  })
}

function addFailNotification(title, message, timer) {
  iziToast.error({
    title: title,
    message: message,
    timeout: timer
  })
}

function addInfoNotification(title, message, timer) {
  iziToast.info({
    title: title,
    message: message,
    timeout: timer
  })
}

function getAge(dateString) {
  var now = new Date()

  var yearNow = now.getYear()
  var monthNow = now.getMonth()
  var dateNow = now.getDate()
  var datesplt = dateString.split('/')
  var dob = new Date(datesplt[2], datesplt[0] - 1, datesplt[1])

  var yearDob = dob.getYear()
  var monthDob = dob.getMonth()
  var dateDob = dob.getDate()
  var age = {}
  var ageString = '';
  var yearString = '';
  var monthString = '';
  var dayString = '';

  yearAge = yearNow - yearDob

  if (monthNow >= monthDob) {
    var monthAge = monthNow - monthDob;
  } else {
    yearAge--
    var monthAge = 12 + monthNow - monthDob
  }

  if (dateNow >= dateDob) {
    var dateAge = dateNow - dateDob;
  } else {
    monthAge--
    var dateAge = 31 + dateNow - dateDob

    if (monthAge < 0) {
      monthAge = 11
      yearAge--
    }
  }

  age = {
    years: yearAge,
    months: monthAge,
    days: dateAge
  }

  if (age.years > 1) yearString = ' years';
  else yearString = ' year';
  if (age.months > 1) monthString = ' months';
  else monthString = ' month';
  if (age.days > 1) dayString = ' days';
  else dayString = ' day';

  if ((age.years > 0) && (age.months > 0) && (age.days > 0)) {
    ageString = age.years + yearString + ", " + age.months + monthString + ", and " + age.days + dayString + " old.";
  } else if ((age.years == 0) && (age.months == 0) && (age.days > 0)) {
    ageString = age.days + dayString + " old.";
  } else if ((age.years > 0) && (age.months == 0) && (age.days == 0)) {
    ageString = age.years + yearString + " old.";
  } else if ((age.years > 0) && (age.months > 0) && (age.days == 0)) {
    ageString = age.years + yearString + " and " + age.months + monthString + " old.";
  } else if ((age.years == 0) && (age.months > 0) && (age.days > 0)) {
    ageString = age.months + monthString + " and " + age.days + dayString + " old.";
  } else if ((age.years > 0) && (age.months == 0) && (age.days > 0)) {
    ageString = age.years + yearString + " and " + age.days + dayString + " old.";
  } else if ((age.years == 0) && (age.months > 0) && (age.days == 0)) {
    ageString = age.months + monthString + " old.";
  } else ageString = 'Oops! Could not calculate age!';
  return ageString
}

function convert(input) {
  var node
  node = JsonHuman.format(input)
  return node
}

/*globals define, module, require, document */
(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define([], factory)
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory()
  } else {
    root.JsonHuman = factory()
  }
}(this, function () {
  'use strict';

  var indexOf = [].indexOf || function (item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (i in this && this[i] === item) return i
    }
    return -1
  };

  function makePrefixer(prefix) {
    return function (name) {
      return prefix + '-' + name
    };
  }

  function isArray(obj) {
    return toString.call(obj) === '[object Array]'
  }

  function sn(tagName, className, data) {
    var result = document.createElement(tagName)

    result.className = className
    result.appendChild(document.createTextNode('' + data))

    return result
  }

  function scn(tagName, className, child) {
    var result = document.createElement(tagName);
    var i;
    var len

    result.className = className

    if (isArray(child)) {
      for (i = 0, len = child.length; i < len; i += 1) {
        result.appendChild(child[i])
      }
    } else {
      result.appendChild(child)
    }

    return result
  }

  function linkNode(child, href, target) {
    var a = scn('a', HYPERLINK_CLASS_NAME, child)
    a.setAttribute('href', href)
    a.setAttribute('target', target)
    return a
  }

  var toString = Object.prototype.toString;
  var prefixer = makePrefixer("jh");
  var p = prefixer;
  var ARRAY = 2;
  var BOOL = 4;
  var INT = 8;
  var FLOAT = 16;
  var STRING = 32;
  var OBJECT = 64;
  var SPECIAL_OBJECT = 128;
  var FUNCTION = 256;
  var UNK = 1;

  var STRING_CLASS_NAME = p("type-string");
  var STRING_EMPTY_CLASS_NAME = p("type-string") + " " + p("empty");

  var BOOL_TRUE_CLASS_NAME = p("type-bool-true");
  var BOOL_FALSE_CLASS_NAME = p("type-bool-false");
  var BOOL_IMAGE = p("type-bool-image");
  var INT_CLASS_NAME = p("type-int") + " " + p("type-number");
  var FLOAT_CLASS_NAME = p("type-float") + " " + p("type-number");

  var OBJECT_CLASS_NAME = p("type-object");
  var OBJ_KEY_CLASS_NAME = p("key") + " " + p("object-key");
  var OBJ_VAL_CLASS_NAME = p("value") + " " + p("object-value");
  var OBJ_EMPTY_CLASS_NAME = p("type-object") + " " + p("empty");

  var FUNCTION_CLASS_NAME = p("type-function");

  var ARRAY_KEY_CLASS_NAME = p("key") + " " + p("array-key");
  var ARRAY_VAL_CLASS_NAME = p("value") + " " + p("array-value");
  var ARRAY_CLASS_NAME = p("type-array");
  var ARRAY_EMPTY_CLASS_NAME = p("type-array") + " " + p("empty");

  var HYPERLINK_CLASS_NAME = p('a');

  var UNKNOWN_CLASS_NAME = p('type-unk')

  function getType(obj) {
    var type = typeof obj

    switch (type) {
      case 'boolean':
        return BOOL
      case 'string':
        return STRING
      case 'number':
        return (obj % 1 === 0) ? INT : FLOAT
      case 'function':
        return FUNCTION
      default:
        if (isArray(obj)) {
          return ARRAY
        } else if (obj === Object(obj)) {
          if (obj.constructor === Object) {
            return OBJECT
          }
          return OBJECT | SPECIAL_OBJECT
        } else {
          return UNK
        }
    }
  }

  function _format(data, options, parentKey) {
    var result;
    var container;
    var key;
    var keyNode;
    var valNode;
    var len;
    var childs;
    var tr;
    var value;
    var isEmpty = true;
    var isSpecial = false;
    var accum = [];
    var type = getType(data)

    // Initialized & used only in case of objects & arrays
    var hyperlinksEnabled, aTarget, hyperlinkKeys

    if (type === BOOL) {
      var boolOpt = options.bool
      container = document.createElement('div')

      if (boolOpt.showImage) {
        var img = document.createElement('img')
        img.setAttribute('class', BOOL_IMAGE)

        img.setAttribute('src',
          '' + (data ? boolOpt.img.true : boolOpt.img.false))

        container.appendChild(img)
      }

      if (boolOpt.showText) {
        container.appendChild(data ?
          sn('span', BOOL_TRUE_CLASS_NAME, boolOpt.text.true) :
          sn('span', BOOL_FALSE_CLASS_NAME, boolOpt.text.false))
      }

      result = container

    } else if (type === STRING) {
      if (data === '') {
        result = sn('span', STRING_EMPTY_CLASS_NAME, '(Empty Text)')
      } else {
        result = sn('span', STRING_CLASS_NAME, data)
      }
    } else if (type === INT) {
      result = sn('span', INT_CLASS_NAME, data)
    } else if (type === FLOAT) {
      result = sn('span', FLOAT_CLASS_NAME, data)
    } else if (type & OBJECT) {
      if (type & SPECIAL_OBJECT) {
        isSpecial = true
      }
      childs = []

      aTarget = options.hyperlinks.target
      hyperlinkKeys = options.hyperlinks.keys

      // Is Hyperlink Key
      hyperlinksEnabled =
        options.hyperlinks.enable &&
        hyperlinkKeys &&
        hyperlinkKeys.length > 0

      for (key in data) {
        isEmpty = false

        value = data[key]

        valNode = _format(value, options, key)
        keyNode = sn('th', OBJ_KEY_CLASS_NAME, key)

        if (hyperlinksEnabled &&
          typeof (value) === 'string' &&
          indexOf.call(hyperlinkKeys, key) >= 0) {
          valNode = scn('td', OBJ_VAL_CLASS_NAME, linkNode(valNode, value, aTarget))
        } else {
          valNode = scn('td', OBJ_VAL_CLASS_NAME, valNode)
        }

        tr = document.createElement('tr')
        tr.appendChild(keyNode)
        tr.appendChild(valNode)

        childs.push(tr)
      }

      if (isSpecial) {
        result = sn('span', STRING_CLASS_NAME, data.toString())
      } else if (isEmpty) {
        result = sn('span', OBJ_EMPTY_CLASS_NAME, '(Empty Object)')
      } else {
        result = scn('table', OBJECT_CLASS_NAME, scn('tbody', '', childs))
      }
    } else if (type === FUNCTION) {
      result = sn('span', FUNCTION_CLASS_NAME, data)
    } else if (type === ARRAY) {
      if (data.length > 0) {
        childs = []
        var showArrayIndices = options.showArrayIndex

        aTarget = options.hyperlinks.target
        hyperlinkKeys = options.hyperlinks.keys

        // Hyperlink of arrays?
        hyperlinksEnabled = parentKey && options.hyperlinks.enable &&
          hyperlinkKeys &&
          hyperlinkKeys.length > 0 &&
          indexOf.call(hyperlinkKeys, parentKey) >= 0

        for (key = 0, len = data.length; key < len; key += 1) {
          keyNode = sn('th', ARRAY_KEY_CLASS_NAME, key)
          value = data[key]

          if (hyperlinksEnabled && typeof (value) === 'string') {
            valNode = _format(value, options, key)
            valNode = scn('td', ARRAY_VAL_CLASS_NAME,
              linkNode(valNode, value, aTarget))
          } else {
            valNode = scn('td', ARRAY_VAL_CLASS_NAME,
              _format(value, options, key))
          }

          tr = document.createElement('tr')

          if (showArrayIndices) {
            tr.appendChild(keyNode)
          }
          tr.appendChild(valNode)

          childs.push(tr)
        }

        result = scn('table', ARRAY_CLASS_NAME, scn('tbody', '', childs))
      } else {
        result = sn('span', ARRAY_EMPTY_CLASS_NAME, '(Empty List)')
      }
    } else {
      result = sn('span', UNKNOWN_CLASS_NAME, data)
    }

    return result
  }

  function format(data, options) {
    options = validateOptions(options || {})

    var result

    result = _format(data, options)
    result.className = result.className + ' ' + prefixer('root')

    return result
  }

  function validateOptions(options) {
    options = validateArrayIndexOption(options)
    options = validateHyperlinkOptions(options)
    options = validateBoolOptions(options)

    // Add any more option validators here

    return options
  }

  function validateArrayIndexOption(options) {
    if (options.showArrayIndex === undefined) {
      options.showArrayIndex = true
    } else {
      // Force to boolean just in case
      options.showArrayIndex = !!options.showArrayIndex;
    }

    return options
  }

  function validateHyperlinkOptions(options) {
    var hyperlinks = {
      enable: false,
      keys: null,
      target: ''
    }

    if (options.hyperlinks && options.hyperlinks.enable) {
      hyperlinks.enable = true

      hyperlinks.keys = isArray(options.hyperlinks.keys) ? options.hyperlinks.keys : []

      if (options.hyperlinks.target) {
        hyperlinks.target = '' + options.hyperlinks.target
      } else {
        hyperlinks.target = '_blank'
      }
    }

    options.hyperlinks = hyperlinks

    return options
  }

  function validateBoolOptions(options) {
    if (!options.bool) {
      options.bool = {
        text: {
          true: 'true',
          false: 'false'
        },
        img: {
          true: '',
          false: ''
        },
        showImage: false,
        showText: true
      }
    } else {
      var boolOptions = options.bool

      // Show text if no option
      if (!boolOptions.showText && !boolOptions.showImage) {
        boolOptions.showImage = false
        boolOptions.showText = true
      }

      if (boolOptions.showText) {
        if (!boolOptions.text) {
          boolOptions.text = {
            true: 'true',
            false: 'false'
          }
        } else {
          var t = boolOptions.text.true;
          var f = boolOptions.text.false

          if (getType(t) != STRING || t === '') {
            boolOptions.text.true = 'true'
          }

          if (getType(f) != STRING || f === '') {
            boolOptions.text.false = 'false'
          }
        }
      }

      if (boolOptions.showImage) {
        if (!boolOptions.img.true && !boolOptions.img.false) {
          boolOptions.showImage = false
        }
      }
    }

    return options
  }

  return {
    format: format
  }
}))

const generateDatatable = (id, data, select) => {
  const theTable = $(`#${id}`).DataTable({
    destroy: true,
    data: data,
    responsive: true,
    dom: "<'row datatable-header'<'col-md-6 datatable-export'B><'col-md-6 datatable-search'f>>'bottom'<'row datatable-footer'<'datatable-length col-md-4'l><'col-md-4 text-center'i><'datatable-paging col-md-4'p>>",
    buttons: ['csv', 'colvis'],
    autoWidth: true
  })
  $(theTable.table().container()).on('keyup', 'tfoot input', function () {
    theTable
      .column($(this).data('index'))
      .search(this.value)
      .draw()
  })
  $(`#${id} tfoot th`).each(function (i) {
    const title = $(`#${id} thead th`).eq($(this).index()).text()
    if (title === 'Action') {
      $(this).html('<input type="text" data-index="' + i + '" readonly class="form-control" style="width:100%;" />')
    } else if (title === 'Select') {
      $(this).html(`<center><input type="checkbox" class="select-all-${select}" style="height:15px; width:15px;"></center>`)
      $(`.select-all-${select}`).click(function () {
        $(`input.select-item-${select}`).each(function (index, item) {
          item.checked = !item.checked
        })
        const all = $(`input.select-all-${select}`)[0]
        const total = $(`input.select-item-${select}`).length
        const len = $(`input.select-item-${select}:checked:checked`).length
        all.checked = len === total
      })
    } else {
      $(this).html('<center><input type="text" placeholder="Filter.." data-index="' + i + '" class="form-control" style="width:100%;" /></center>')
    }
  })
}

const generateDatatableServerSide = (table, url, select, settings) => {
  let datatable = $(`#${table}`).DataTable({
    // dom: "<'row'<'col-md-6'><'col-md-6'>'bottom'<'col-md-4'l><'col-md-4 text-center'i><'col-md-4'p>>",
    dom:
      // "<'row'<'col-sm-6'B><'col-sm-6'f>>" +
      "<'row'<'col-sm-12'tr>>" +
      "<'row'<'col-sm-4'l><'col-sm-4 text-center'i><'col-sm-4'p>>",
    destroy: true,
    responsive: true,
    processing: true,
    language: {
      processing: '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span> '
    },
    serverSide: true,
    ajax: url,
  })
  $(datatable.table().container()).on('keyup', 'tfoot input', function () {
    datatable
      .column($(this).data('index'))
      .search(this.value)
      .draw()
  })
  let enableFilter = settings.enableFilter
  $(`#${table} tfoot th`).each(function (i) {
    let title = $(`#${table} thead th`).eq($(this).index()).text()
    if (enableFilter.includes(title)) {
      if (title === 'Select') {
        $(this).html(`<center><input type="checkbox" class="select-all-${select}" style="height:15px; width:15px;"></center>`)
        $(`.select-all-${select}`).click(function () {
          $(`input.select-item-${select}`).each(function (index, item) {
            item.checked = !item.checked
          })
          let all = $(`input.select-all-${select}`)[0]
          let total = $(`input.select-item-${select}`).length
          let len = $(`input.select-item-${select}:checked:checked`).length
          all.checked = len === total
        })
      } else {
        $(this).html('<center><input type="text" placeholder="Filter.." data-index="' + i + '" class="form-control" style="width:100%;" /></center>')
      }
    } else {
      if (title === 'Select') {
        $(this).html(`<center><input type="checkbox" class="select-all-${select}" style="height:15px; width:15px;"></center>`)
        $(`.select-all-${select}`).click(function () {
          $(`input.select-item-${select}`).each(function (index, item) {
            item.checked = !item.checked
          })
          let all = $(`input.select-all-${select}`)[0]
          let total = $(`input.select-item-${select}`).length
          let len = $(`input.select-item-${select}:checked:checked`).length
          all.checked = len === total
        })
      } else {
        $(this).html('<input type="text" data-index="' + i + '" readonly class="form-control" style="width:100%;" />')
      }
    }
  })
}

const getPageResult = (options) => {
  requestData(options.directPage, { method: "GET", params: { path: options.tablePath } }, function (resp) {
    $(`#${options.tablePlacement}`).html(resp)
    generateDatatable(options.tableId, options.data, options.selectId)
  })
}

const getPageResultDatatableServerSide = (options) => {
  requestData(options.directPage, { method: "GET", params: { path: options.tablePath } }, function (resp) {
    $(`#${options.tablePlacement}`).html(resp)
    generateDatatableServerSide(options.tableId, options.data, options.selectId, options.settings)
  })
}

const delayInput = (callback, ms) => {
  var timer = 0;
  return function () {
    var context = this, args = arguments;
    clearTimeout(timer)
    timer = setTimeout(function () {
      callback.apply(context, args)
    }, ms || 0)
  }
}

function generateTable(settings, data) {
  let tblSettings = settings
  let dtSettings = {
    responsive: true,
    columns: [],
    order: tblSettings.order,
    destroy: true,
    dom: "<'row datatable-header'<'col-md-6 datatable-export'B>rt<'col-md-6 datatable-search'>>'bottom'<'row datatable-footer'<'datatable-length col-md-4'l><'col-md-4 text-center'i><'datatable-paging col-md-4'p>>",
    columnDefs: [],
    buttons: [
      {
        extend: 'csv',
        exportOptions: {
          columns: '[tabindex="0"]'
        }
      },
      'colvis'
    ],
    autoWidth: false,
    colReorder: true,
    ajax: {},
    language: {
      processing: '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...'
    }
  }
  if (Array.isArray(tblSettings.data)) {
    dtSettings.data = tblSettings.data
  } else {
    dtSettings.ajax.url = tblSettings.data
    dtSettings.ajax.type = "POST"
    dtSettings.processing = true
    dtSettings.serverSide = true
    if (data) {
      dtSettings.ajax.data = data
    }
  }
  $.each(tblSettings.columns, function (index, item) {
    dtSettings.columns.push({
      data: item.name,
      name: item.name,
      width: item.width ? item.width : '',
      autoWidth: item.width ? '' : true,
      className: item.nowrap ? 'cutText' : `p-2 ${item.className}`,
      defaultContent: item.default ? item.default : '',
      ordering: item.orderable ? item.orderable : true
    })
  })
  let shiftColumn = 0
  dtSettings.drawCallback = function (a, b) {
    $("[data-toggle='tooltip']").tooltip({
      html: true
    });
  }
  $.each(tblSettings.columns, function (index, item) {
    index = parseInt(index)
    if (item.hasOwnProperty('maxLength'))
      dtSettings.columnDefs.push({
        targets: index + shiftColumn,
        data: item.name,
        render: function (data, type, row, meta) {
          if (data) {
            title = data.toString().replace(/"/g, "'")
          }
          return data && type === 'display' && data.length > item.maxLength ?
            `<span class="copyText" onclick="copyText('${escape(data)}','${item.label}')" 
              data-template='<div class="tooltip arrow" role="tooltip"><div class="tooltip-inner bg-info"></div></div>' 
              data-toggle='tooltip' title='' data-original-title="${title}">${data.substr(0, item.maxLength)}...</span>` :
            data
        }
      })
    if (item.hasOwnProperty('visible'))
      dtSettings.columnDefs.push({
        targets: index + shiftColumn,
        data: item.name,
        visible: item.visible
      })
    if (item.hasOwnProperty('orderable')) {
      dtSettings.columnDefs.push({
        targets: index + shiftColumn,
        orderable: item.orderable,
        className: 'p-2',
        searchable: false
      })
      i = 1
    }
    if (item.hasOwnProperty('jsonHuman'))
      dtSettings.columnDefs.push({
        targets: index + shiftColumn,
        data: item.name,
        render: function (data, type, row, meta) {
          return data && type === 'display' ?
            JsonHuman.format(data).outerHTML :
            ''
        }
      })
    if (item.hasOwnProperty('actions'))
      dtSettings.columnDefs.push({
        targets: index,
        data: item.name,
        className: 'dt-center',
        orderable: false,
        render: function (data, type, row, meta) {
          if (data) {
            title = data.toString().replace(/"/g, "'")
          }
          return data && type === 'display' ?
            createRecordActionButtons(tblSettings.actions, data) :
            ''
        }
      })
    if (item.hasOwnProperty('copyAbleInfo'))
      dtSettings.columnDefs.push({
        targets: index + shiftColumn,
        data: item.name,
        render: function (data, type, row, meta) {
          if (data) {
            title = data.toString().replace(/"/g, "'")
          }
          return data && type === 'display' ?
            `<span onclick="copyText('${escape(data)}','${item.label}')" 
            showtooltip="${title}" flow="up" style="color:inherit;">${data}</span>` :
            data
        }
      })
  })
  $('#' + settings.id + ' tfoot tr:eq(0) th').each(function () {
    var title = $(this).text();
    var name = $(this).data('name')
    if (name) {
      $(this).html('<div class="input-group-sm"><input type="text" name="' + name + '" class="dt-filter form-control column_search" style="width:100%" placeholder="..." value="" autocomplete="__away"></div>');
    } else {
      $(this).html('<div class="input-group-sm"></div>')
    }
  })
  $('#' + settings.id + '').DataTable(dtSettings).destroy()
  const cont = document.getElementById(tblSettings.id + 'Container')
  $(cont).addClass('mx-5')
  if ($(window).width() < 1090) {
    $(cont).addClass('mx-4').removeClass('mx-5')
  }
  $('input').attr('autocomplete', 'off')
  table = $('#' + settings.id + '').DataTable(dtSettings)
  $(cont).removeClass('none')
  $('#' + settings.id + ' tfoot').on('keyup', '.column_search', (delayInput(function (e) {
    name = $(this).attr('name')
    id = table.column(name + ':name').index()
    table
      .column(id)
      .search(this.value)
      .draw()
  }, 700)))
  table.on('row-reorder', function (e, diff, edit) {
    for (var i = 0, ien = diff.length; i < ien; i++) {
      $(diff[i].node).addClass('reordered')
    }
  })
  $.fn.dataTable.ext.errMode = function (e, settings, techNote, message) {
    if (e.jqXHR) {
      addFailNotification('[ Error when trying to load data ] ', e.jqXHR.responseText)
    }
  }
}

const formatNumber = (num) => {
  var str = num.toString().replace("", ""), parts = false, output = [], i = 1, formatted = null;
  if (str.indexOf(".") > 0) {
    parts = str.split(".");
    str = parts[0];
  }
  str = str.split("").reverse();
  for (var j = 0, len = str.length; j < len; j++) {
    if (str[j] != ",") {
      output.push(str[j]);
      if (i % 3 == 0 && j < (len - 1)) {
        output.push(",");
      }
      i++;
    }
  }
  formatted = output.reverse().join("");
  return ("" + formatted + ((parts) ? "." + parts[1].substr(0, 2) : ""));
}

function rupiah(objNum) {
  var num = objNum.value
  var ent, dec;
  if (num != '' && num != objNum.oldvalue) {
    num = HapusTitik(num);
    if (isNaN(num)) {
      objNum.value = (objNum.oldvalue) ? objNum.oldvalue : '';
    } else {
      var ev = (navigator.appName.indexOf('Netscape') != -1) ? Event : event;
      if (ev.keyCode == 190 || !isNaN(num.split(',')[1])) {
        alert(num.split(',')[1]);
        objNum.value = TambahTitik(num.split(',')[0]) + ',' + num.split(',')[1];
      } else {
        objNum.value = TambahTitik(num.split(',')[0]);
      }
      objNum.oldvalue = objNum.value;
    }
  }
}

function HapusTitik(num) {
  return (num.replace(/\,/g, ''));
}

function TambahTitik(num) {
  numArr = new String(num).split('').reverse();
  for (i = 3; i < numArr.length; i += 3) {
    numArr[i] += ',';
  }
  return numArr.reverse().join('');
}

function norp(angka) {
  var rupiah = angka.replace(/,/g, '')
  return rupiah
}

function sendPost(options) {
  send('POST', options)
}

function sendGet(options) {
  send('GET', options)
}

function sendPut(options) {
  send('PUT', options)
}

function sendDelete(options) {
  send('DELETE', options)
}

function confirmDeleteReport(){
  var x = confirm("Are you sure?");
  if (x)
    return true;
  else
    return false;
}

function send(method, options) {
  var resp = $.ajax({
    type: method,
    url: options.url,
    data: options.data
  })

  const defaultDone = function(statusCode, data, text) {
    if (statusCode === 303) {
      window.location = text
    } else {
      if (method === 'POST') {
        if (!data) {
          window.location.reload()
        }else{
          window.location.href = data.links.view.url
        }
      } else if (method === 'PUT') {
        window.location.reload()
      } else if (method === 'DELETE') {
        if (!data) {
          window.location.reload()
        }else{
          window.location = data.links.index.url
        }
      } else {
        addSuccessNotification(data.message)
      }
    }
  }

  const defaultFail = function(statusCode, data, text) {
    addFailNotification(statusCode, text)
  }

  resp.always(function(x, xx, xxx) {
    const context = xxx.status !== undefined ? xxx : x
    if (context.status >= 200 && context.status < 400) {
      if (options.done) {
        options.done(
          '[' + context.status + '] ' + context.statusText,
          context.responseJSON,
          context.responseText,
          defaultDone
        )
      } else {
        defaultDone('[' + context.status + '] ' + context.statusText, context.responseJSON, context.responseText)
      }
    } else {
      if (options.fail) {
        options.fail(
          '[' + context.status + '] ' + context.statusText,
          context.responseJSON,
          context.responseText,
          defaultFail
        )
      } else {
        defaultFail('[' + context.status + '] ' + context.statusText, context.responseJSON, context.responseText)
      }
    }
  })
}
