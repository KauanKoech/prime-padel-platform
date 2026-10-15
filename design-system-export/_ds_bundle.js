/* @ds-bundle: {"format":4,"namespace":"PrimePadelDesignSystem_093c26","components":[{"name":"Button","sourcePath":"components/actions/Button.jsx"},{"name":"IconButton","sourcePath":"components/actions/IconButton.jsx"},{"name":"CourtCard","sourcePath":"components/booking/CourtCard.jsx"},{"name":"DateStrip","sourcePath":"components/booking/DateStrip.jsx"},{"name":"TimeSlot","sourcePath":"components/booking/TimeSlot.jsx"},{"name":"Icon","sourcePath":"components/brand/Icon.jsx"},{"name":"Logo","sourcePath":"components/brand/Logo.jsx"},{"name":"Avatar","sourcePath":"components/display/Avatar.jsx"},{"name":"Badge","sourcePath":"components/display/Badge.jsx"},{"name":"Card","sourcePath":"components/display/Card.jsx"},{"name":"Chip","sourcePath":"components/display/Chip.jsx"},{"name":"Eyebrow","sourcePath":"components/display/Eyebrow.jsx"},{"name":"StatCard","sourcePath":"components/display/StatCard.jsx"},{"name":"Table","sourcePath":"components/display/Table.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"SegmentedControl","sourcePath":"components/forms/SegmentedControl.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Accordion","sourcePath":"components/navigation/Accordion.jsx"},{"name":"ProgressSteps","sourcePath":"components/navigation/ProgressSteps.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/actions/Button.jsx":"678cda15c6f9","components/actions/IconButton.jsx":"f19bad7c6e12","components/booking/CourtCard.jsx":"8e6af5474524","components/booking/DateStrip.jsx":"368ef8692eaf","components/booking/TimeSlot.jsx":"343d8ea7682b","components/brand/Icon.jsx":"1f0619e37581","components/brand/Logo.jsx":"aa3f786a40f1","components/display/Avatar.jsx":"623621312d9b","components/display/Badge.jsx":"52ef0c93a869","components/display/Card.jsx":"a03cf0594e53","components/display/Chip.jsx":"8c9a89611576","components/display/Eyebrow.jsx":"736b7314c500","components/display/StatCard.jsx":"a95b7d98796e","components/display/Table.jsx":"b12f6c832721","components/feedback/Dialog.jsx":"3d41750fbc7d","components/feedback/Toast.jsx":"6c4efeefcd90","components/feedback/Tooltip.jsx":"5dbf045df748","components/forms/Checkbox.jsx":"097d066bc257","components/forms/Input.jsx":"8a5cc6119549","components/forms/Radio.jsx":"279e6c8cf401","components/forms/SegmentedControl.jsx":"4e16bc92b842","components/forms/Select.jsx":"c4fd907a42c9","components/forms/Switch.jsx":"34a84c751ecb","components/navigation/Accordion.jsx":"c7d35031b854","components/navigation/ProgressSteps.jsx":"b7cc5280f411","components/navigation/Tabs.jsx":"e6d2ab2283a5","ui_kits/admin/Dashboard.jsx":"930abb1b6364","ui_kits/admin/Dialogs.jsx":"4ab3165166e5","ui_kits/admin/Screens.jsx":"4a723496e85d","ui_kits/admin/Shell.jsx":"cf581356b108","ui_kits/admin/data.jsx":"2a86424b716f","ui_kits/booking/Steps.jsx":"e0362e6cb077","ui_kits/booking/data.jsx":"c21979d323bc","ui_kits/landing/Header.jsx":"fa3a3cafac6c","ui_kits/landing/Sections.jsx":"1a8342b00a53"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.PrimePadelDesignSystem_093c26 = window.PrimePadelDesignSystem_093c26 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/actions/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Button({
  variant = 'primary',
  size = 'md',
  block = false,
  iconLeft,
  iconRight,
  disabled,
  children,
  className = '',
  as = 'button',
  ...rest
}) {
  const Tag = as;
  const cls = ['pp-btn', `pp-btn--${variant}`, `pp-btn--${size}`, block ? 'pp-btn--block' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls,
    disabled: Tag === 'button' ? disabled : undefined,
    "aria-disabled": disabled || undefined
  }, rest), iconLeft ? /*#__PURE__*/React.createElement("span", {
    className: "pp-btn__icon"
  }, iconLeft) : null, children != null ? /*#__PURE__*/React.createElement("span", null, children) : null, iconRight ? /*#__PURE__*/React.createElement("span", {
    className: "pp-btn__icon"
  }, iconRight) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Button.jsx", error: String((e && e.message) || e) }); }

// components/actions/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function IconButton({
  icon,
  label,
  variant = 'ghost',
  size = 'md',
  badge,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label,
    title: label,
    className: ['pp-iconbtn', 'pp-iconbtn--' + variant, 'pp-iconbtn--' + size, className].join(' ')
  }, rest), icon, badge != null && badge !== false ? /*#__PURE__*/React.createElement("span", {
    className: "pp-iconbtn__badge"
  }, badge) : null);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/booking/DateStrip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function DateStrip({
  days = [],
  value,
  onChange,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: 'pp-dates ' + className,
    role: "listbox"
  }, rest), days.map(function (d) {
    var cls = 'pp-date' + (d.today ? ' pp-date--today' : '');
    return /*#__PURE__*/React.createElement("button", {
      key: d.key,
      type: "button",
      className: cls,
      "aria-pressed": value === d.key,
      disabled: d.disabled,
      onClick: function () {
        if (onChange) onChange(d.key);
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "pp-date__wd"
    }, d.weekday), /*#__PURE__*/React.createElement("span", {
      className: "pp-date__day"
    }, d.day), d.month ? /*#__PURE__*/React.createElement("span", {
      className: "pp-date__mo"
    }, d.month) : null);
  }));
}
Object.assign(__ds_scope, { DateStrip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/booking/DateStrip.jsx", error: String((e && e.message) || e) }); }

// components/booking/TimeSlot.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function TimeSlot({
  time,
  meta,
  status = 'available',
  peak = false,
  onClick,
  className = '',
  ...rest
}) {
  const label = meta != null ? meta : status === 'unavailable' ? 'Reservado' : status === 'pending' ? 'Aguardando' : '';
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: ['pp-slot', status !== 'available' ? 'pp-slot--' + status : '', className].join(' '),
    "aria-pressed": status === 'selected',
    disabled: status === 'unavailable' || status === 'pending',
    onClick: onClick
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "pp-slot__time"
  }, time), label ? /*#__PURE__*/React.createElement("span", {
    className: "pp-slot__meta"
  }, label) : null, peak && status !== 'unavailable' ? /*#__PURE__*/React.createElement("span", {
    className: "pp-slot__peak",
    title: "Hor\xE1rio nobre"
  }) : null);
}
Object.assign(__ds_scope, { TimeSlot });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/booking/TimeSlot.jsx", error: String((e && e.message) || e) }); }

// components/brand/Icon.jsx
try { (() => {
function toPascal(n) {
  return String(n).split(/[-_ ]/).map(function (s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }).join('');
}
function renderNode(node, key) {
  var kids = node[2] || [];
  return React.createElement(node[0], Object.assign({
    key: key
  }, node[1] || {}), kids.map(function (k, i) {
    return renderNode(k, i);
  }));
}
function Icon({
  name,
  size = 20,
  strokeWidth = 1.75,
  color = 'currentColor',
  className = '',
  style,
  title
}) {
  const lib = typeof window !== 'undefined' && window.lucide && window.lucide.icons;
  const node = lib ? lib[toPascal(name)] : null;
  const children = node ? node[0] === 'svg' ? node[2] : node : [];
  return /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: 'pp-icon ' + className,
    style: Object.assign({
      flex: 'none',
      display: 'inline-block'
    }, style),
    "aria-hidden": title ? undefined : true,
    role: title ? 'img' : undefined
  }, title ? /*#__PURE__*/React.createElement("title", null, title) : null, children.map(function (c, i) {
    return renderNode(c, i);
  }));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Icon.jsx", error: String((e && e.message) || e) }); }

// components/brand/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Logo({
  color = 'green',
  variant = 'primary',
  height = 48,
  basePath = '',
  alt,
  style,
  ...rest
}) {
  const file = (variant === 'open' ? 'open-prime-padel-' : 'prime-padel-') + color + '.png';
  return /*#__PURE__*/React.createElement("img", _extends({
    className: "pp-logo",
    src: basePath + 'assets/logo/' + file,
    alt: alt || (variant === 'open' ? '1º Open Prime Padel' : 'Prime Padel'),
    style: Object.assign({
      height: height,
      width: 'auto'
    }, style)
  }, rest));
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Logo.jsx", error: String((e && e.message) || e) }); }

// components/display/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function initials(name) {
  if (!name) return '';
  var p = String(name).trim().split(/\s+/);
  return ((p[0] || '').charAt(0) + (p.length > 1 ? p[p.length - 1].charAt(0) : '')).toUpperCase();
}
function Avatar({
  name,
  src,
  size = 'md',
  tone = 'tint',
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ['pp-avatar', 'pp-avatar--' + size, tone === 'brand' ? 'pp-avatar--brand' : '', className].join(' '),
    title: name
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name || ''
  }) : initials(name));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/display/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Badge({
  tone = 'neutral',
  dot = false,
  size = 'md',
  icon,
  className = '',
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ['pp-badge', 'pp-badge--' + tone, dot ? 'pp-badge--dot' : '', size === 'sm' ? 'pp-badge--sm' : '', className].join(' ')
  }, rest), icon, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Badge.jsx", error: String((e && e.message) || e) }); }

// components/booking/CourtCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function CourtCard({
  name,
  image,
  tags = [],
  price,
  priceUnit = '/ hora',
  availability,
  flag,
  compact = false,
  selected = false,
  onClick,
  basePath = '',
  className = '',
  children,
  ...rest
}) {
  const cls = ['pp-court', compact ? 'pp-court--compact' : '', onClick ? 'pp-court--interactive' : '', selected ? 'pp-court--selected' : '', className].join(' ');
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls,
    onClick: onClick,
    role: onClick ? 'button' : undefined,
    tabIndex: onClick ? 0 : undefined,
    "aria-pressed": onClick ? selected : undefined
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "pp-court__media"
  }, image ? /*#__PURE__*/React.createElement("img", {
    className: "pp-court__photo",
    src: image,
    alt: name
  }) : /*#__PURE__*/React.createElement("img", {
    className: "pp-court__mark",
    src: basePath + 'assets/logo/prime-padel-white.png',
    alt: ""
  }), flag && !compact ? /*#__PURE__*/React.createElement("span", {
    className: "pp-court__flag"
  }, flag) : null), /*#__PURE__*/React.createElement("div", {
    className: "pp-court__body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pp-court__name"
  }, name), tags.length ? /*#__PURE__*/React.createElement("div", {
    className: "pp-court__tags"
  }, tags.map(function (t) {
    return /*#__PURE__*/React.createElement(__ds_scope.Badge, {
      key: t,
      tone: "neutral",
      size: compact ? 'sm' : 'md'
    }, t);
  })) : null, compact ? availability ? /*#__PURE__*/React.createElement("span", {
    className: "pp-court__avail"
  }, availability) : null : /*#__PURE__*/React.createElement("div", {
    className: "pp-court__row"
  }, /*#__PURE__*/React.createElement("div", null, price ? /*#__PURE__*/React.createElement("div", {
    className: "pp-court__price"
  }, price, " ", /*#__PURE__*/React.createElement("small", null, priceUnit)) : null, availability ? /*#__PURE__*/React.createElement("div", {
    className: "pp-court__avail",
    style: {
      marginTop: 8
    }
  }, availability) : null), children)), compact && price ? /*#__PURE__*/React.createElement("div", {
    className: "pp-court__price",
    style: {
      whiteSpace: 'nowrap'
    }
  }, price) : null);
}
Object.assign(__ds_scope, { CourtCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/booking/CourtCard.jsx", error: String((e && e.message) || e) }); }

// components/display/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Card({
  variant = 'outlined',
  padding = 'md',
  interactive = false,
  selected = false,
  as = 'div',
  className = '',
  children,
  ...rest
}) {
  const Tag = as;
  const cls = ['pp-card', variant !== 'outlined' ? 'pp-card--' + variant : '', 'pp-card--p-' + padding, interactive ? 'pp-card--interactive' : '', selected ? 'pp-card--selected' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Card.jsx", error: String((e && e.message) || e) }); }

// components/display/Chip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Chip({
  selected = false,
  dot = false,
  count,
  icon,
  className = '',
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-pressed": selected,
    className: 'pp-chip ' + className
  }, rest), dot ? /*#__PURE__*/React.createElement("span", {
    className: "pp-chip__dot"
  }) : null, icon, /*#__PURE__*/React.createElement("span", null, children), count != null ? /*#__PURE__*/React.createElement("span", {
    className: "pp-chip__count"
  }, count) : null);
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Chip.jsx", error: String((e && e.message) || e) }); }

// components/display/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Eyebrow({
  variant = 'tint',
  icon,
  className = '',
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ['pp-eyebrow', variant !== 'tint' ? 'pp-eyebrow--' + variant : '', className].join(' ')
  }, rest), icon, children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/display/StatCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function StatCard({
  label,
  value,
  unit,
  icon,
  delta,
  deltaTone = 'success',
  foot,
  progress,
  variant = 'default',
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ['pp-stat', variant !== 'default' ? 'pp-stat--' + variant : '', className].join(' ')
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "pp-stat__top"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pp-stat__label"
  }, label), icon ? /*#__PURE__*/React.createElement("span", {
    className: "pp-stat__icon"
  }, icon) : null), /*#__PURE__*/React.createElement("div", {
    className: "pp-stat__value"
  }, value, unit ? /*#__PURE__*/React.createElement("small", null, unit) : null), progress != null ? /*#__PURE__*/React.createElement("div", {
    className: "pp-stat__bar"
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      width: Math.max(0, Math.min(100, progress)) + '%'
    }
  })) : null, delta || foot ? /*#__PURE__*/React.createElement("div", {
    className: "pp-stat__foot"
  }, delta ? /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: variant === 'brand' ? 'ball' : deltaTone,
    size: "sm"
  }, delta) : null, foot ? /*#__PURE__*/React.createElement("span", null, foot) : null) : null);
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/StatCard.jsx", error: String((e && e.message) || e) }); }

// components/display/Table.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Table({
  columns = [],
  rows = [],
  rowKey = 'id',
  onRowClick,
  stackOnMobile = true,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ['pp-table-wrap', stackOnMobile ? 'pp-table-wrap--stack' : '', className].join(' ')
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "pp-table-box"
  }, /*#__PURE__*/React.createElement("table", {
    className: 'pp-table' + (onRowClick ? ' pp-table--clickable' : '')
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, columns.map(function (c) {
    return /*#__PURE__*/React.createElement("th", {
      key: c.key,
      className: c.align === 'right' ? 'is-right' : '',
      style: c.width ? {
        width: c.width
      } : undefined
    }, c.header);
  }))), /*#__PURE__*/React.createElement("tbody", null, rows.map(function (r, i) {
    return /*#__PURE__*/React.createElement("tr", {
      key: r[rowKey] != null ? r[rowKey] : i,
      onClick: onRowClick ? function () {
        onRowClick(r);
      } : undefined
    }, columns.map(function (c) {
      var cls = [c.align === 'right' ? 'is-right' : '', c.num ? 'is-num' : ''].join(' ');
      return /*#__PURE__*/React.createElement("td", {
        key: c.key,
        className: cls,
        "data-label": typeof c.header === 'string' ? c.header : '',
        "data-primary": c.primary ? '' : undefined
      }, c.render ? c.render(r) : r[c.key]);
    }));
  })))));
}
Object.assign(__ds_scope, { Table });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Table.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function Dialog({
  open,
  onClose,
  title,
  description,
  footer,
  variant = 'center',
  width,
  className = '',
  children
}) {
  React.useEffect(function () {
    if (!open) return;
    function onKey(e) {
      if (e.key === 'Escape' && onClose) onClose();
    }
    window.addEventListener('keydown', onKey);
    return function () {
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: 'pp-dialog' + (variant === 'drawer' ? ' pp-dialog--drawer' : ''),
    onMouseDown: function (e) {
      if (e.target === e.currentTarget && onClose) onClose();
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: 'pp-dialog__panel ' + className,
    role: "dialog",
    "aria-modal": "true",
    style: width ? {
      maxWidth: width
    } : undefined
  }, /*#__PURE__*/React.createElement("div", {
    className: "pp-dialog__head"
  }, /*#__PURE__*/React.createElement("div", null, title ? /*#__PURE__*/React.createElement("h2", {
    className: "pp-dialog__title"
  }, title) : null, description ? /*#__PURE__*/React.createElement("p", {
    className: "pp-dialog__desc"
  }, description) : null), onClose ? /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "x",
      size: 20
    }),
    label: "Fechar",
    variant: "secondary",
    size: "md",
    onClick: onClose
  }) : null), /*#__PURE__*/React.createElement("div", {
    className: "pp-dialog__body"
  }, children), footer ? /*#__PURE__*/React.createElement("div", {
    className: "pp-dialog__foot"
  }, footer) : null));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Toast({
  tone = 'default',
  icon,
  title,
  description,
  actionLabel,
  onAction,
  onClose,
  className = '',
  ...rest
}) {
  const ic = icon !== undefined ? icon : /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: tone === 'danger' ? 'circle-alert' : 'circle-check',
    size: 20
  });
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "status",
    className: ['pp-toast', tone !== 'default' ? 'pp-toast--' + tone : '', className].join(' ')
  }, rest), ic ? /*#__PURE__*/React.createElement("span", {
    className: "pp-toast__icon"
  }, ic) : null, /*#__PURE__*/React.createElement("div", {
    className: "pp-toast__body"
  }, title ? /*#__PURE__*/React.createElement("div", {
    className: "pp-toast__title"
  }, title) : null, description ? /*#__PURE__*/React.createElement("div", {
    className: "pp-toast__desc"
  }, description) : null), actionLabel ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "pp-toast__action",
    onClick: onAction
  }, actionLabel) : null, onClose ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "pp-toast__close",
    "aria-label": "Fechar",
    onClick: onClose
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 18
  })) : null);
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function Tooltip({
  label,
  placement = 'top',
  open = false,
  className = '',
  children
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: 'pp-tip' + (open ? ' pp-tip--open' : '') + ' ' + className
  }, children, /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    className: 'pp-tip__bubble' + (placement === 'bottom' ? ' pp-tip__bubble--bottom' : '')
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Checkbox({
  label,
  description,
  disabled,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: ['pp-check', disabled ? 'pp-check--disabled' : '', className].join(' ')
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    disabled: disabled
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "pp-check__box"
  }), label != null ? /*#__PURE__*/React.createElement("span", null, label, description ? /*#__PURE__*/React.createElement("span", {
    className: "pp-check__desc"
  }, description) : null) : null);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Input({
  label,
  hint,
  error,
  optional,
  iconLeft,
  iconRight,
  size = 'md',
  disabled,
  id,
  multiline,
  rows = 4,
  className = '',
  ...rest
}) {
  const auto = React.useId();
  const fid = id || auto;
  const cls = ['pp-field', error ? 'pp-field--error' : '', disabled ? 'pp-field--disabled' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", {
    className: cls
  }, label ? /*#__PURE__*/React.createElement("label", {
    className: "pp-field__label",
    htmlFor: fid
  }, label, optional ? /*#__PURE__*/React.createElement("em", null, " (opcional)") : null) : null, /*#__PURE__*/React.createElement("div", {
    className: 'pp-control pp-control--' + size + (multiline ? ' pp-control--area' : '')
  }, iconLeft ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex'
    }
  }, iconLeft) : null, multiline ? /*#__PURE__*/React.createElement("textarea", _extends({
    id: fid,
    rows: rows,
    disabled: disabled
  }, rest)) : /*#__PURE__*/React.createElement("input", _extends({
    id: fid,
    disabled: disabled
  }, rest)), iconRight ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex'
    }
  }, iconRight) : null), error || hint ? /*#__PURE__*/React.createElement("span", {
    className: "pp-field__hint"
  }, error || hint) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Radio({
  label,
  description,
  disabled,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: ['pp-check', disabled ? 'pp-check--disabled' : '', className].join(' ')
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "radio",
    disabled: disabled
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "pp-check__box pp-check__box--radio"
  }), label != null ? /*#__PURE__*/React.createElement("span", null, label, description ? /*#__PURE__*/React.createElement("span", {
    className: "pp-check__desc"
  }, description) : null) : null);
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/SegmentedControl.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SegmentedControl({
  options = [],
  value,
  defaultValue,
  onChange,
  block = false,
  tone = 'neutral',
  className = '',
  ...rest
}) {
  const norm = options.map(function (o) {
    return typeof o === 'string' ? {
      value: o,
      label: o
    } : o;
  });
  const [inner, setInner] = React.useState(defaultValue != null ? defaultValue : norm[0] && norm[0].value);
  const cur = value !== undefined ? value : inner;
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "group",
    className: ['pp-seg', block ? 'pp-seg--block' : '', tone === 'brand' ? 'pp-seg--brand' : '', className].join(' ')
  }, rest), norm.map(function (o) {
    return /*#__PURE__*/React.createElement("button", {
      key: o.value,
      type: "button",
      className: "pp-seg__opt",
      "aria-pressed": cur === o.value,
      disabled: o.disabled,
      onClick: function () {
        setInner(o.value);
        if (onChange) onChange(o.value);
      }
    }, o.label);
  }));
}
Object.assign(__ds_scope, { SegmentedControl });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SegmentedControl.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Select({
  label,
  hint,
  error,
  options = [],
  placeholder,
  size = 'md',
  disabled,
  id,
  iconLeft,
  className = '',
  children,
  ...rest
}) {
  const auto = React.useId();
  const fid = id || auto;
  const cls = ['pp-field', error ? 'pp-field--error' : '', disabled ? 'pp-field--disabled' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", {
    className: cls
  }, label ? /*#__PURE__*/React.createElement("label", {
    className: "pp-field__label",
    htmlFor: fid
  }, label) : null, /*#__PURE__*/React.createElement("div", {
    className: 'pp-control pp-control--' + size
  }, iconLeft ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex'
    }
  }, iconLeft) : null, /*#__PURE__*/React.createElement("select", _extends({
    id: fid,
    disabled: disabled
  }, rest), placeholder ? /*#__PURE__*/React.createElement("option", {
    value: ""
  }, placeholder) : null, options.map(function (o) {
    var v = typeof o === 'string' ? o : o.value;
    var l = typeof o === 'string' ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  }), children), /*#__PURE__*/React.createElement("span", {
    className: "pp-control__chev"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 18
  }))), error || hint ? /*#__PURE__*/React.createElement("span", {
    className: "pp-field__hint"
  }, error || hint) : null);
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Switch({
  label,
  disabled,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: ['pp-switch', disabled ? 'pp-switch--disabled' : '', className].join(' ')
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    role: "switch",
    disabled: disabled
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "pp-switch__track"
  }), label != null ? /*#__PURE__*/React.createElement("span", null, label) : null);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Accordion.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Accordion({
  items = [],
  defaultOpen = 0,
  multiple = false,
  className = '',
  ...rest
}) {
  const [open, setOpen] = React.useState(defaultOpen == null ? [] : [defaultOpen]);
  function toggle(i) {
    setOpen(function (o) {
      var has = o.indexOf(i) >= 0;
      if (multiple) return has ? o.filter(function (x) {
        return x !== i;
      }) : o.concat([i]);
      return has ? [] : [i];
    });
  }
  return /*#__PURE__*/React.createElement("div", _extends({
    className: 'pp-acc ' + className
  }, rest), items.map(function (it, i) {
    var isOpen = open.indexOf(i) >= 0;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: 'pp-acc__item' + (isOpen ? ' pp-acc__item--open' : '')
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "pp-acc__head",
      "aria-expanded": isOpen,
      onClick: function () {
        toggle(i);
      }
    }, /*#__PURE__*/React.createElement("span", null, it.q), /*#__PURE__*/React.createElement("span", {
      className: "pp-acc__chev"
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "chevron-down",
      size: 20
    }))), isOpen ? /*#__PURE__*/React.createElement("div", {
      className: "pp-acc__panel"
    }, it.a) : null);
  }));
}
Object.assign(__ds_scope, { Accordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Accordion.jsx", error: String((e && e.message) || e) }); }

// components/navigation/ProgressSteps.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ProgressSteps({
  steps = [],
  current = 0,
  variant = 'bar',
  className = '',
  ...rest
}) {
  if (variant === 'numbered') {
    var out = [];
    steps.forEach(function (s, i) {
      var st = i < current ? 'done' : i === current ? 'current' : 'todo';
      if (i > 0) out.push(/*#__PURE__*/React.createElement("span", {
        key: 'l' + i,
        className: "pp-steps__line"
      }));
      out.push(/*#__PURE__*/React.createElement("span", {
        key: i,
        className: 'pp-steps__item pp-steps__item--' + st
      }, /*#__PURE__*/React.createElement("span", {
        className: "pp-steps__num"
      }, i + 1), s));
    });
    return /*#__PURE__*/React.createElement("div", _extends({
      className: 'pp-steps pp-steps--numbered ' + className
    }, rest), out);
  }
  return /*#__PURE__*/React.createElement("div", _extends({
    className: 'pp-steps ' + className
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "pp-steps__bars"
  }, steps.map(function (s, i) {
    return /*#__PURE__*/React.createElement("span", {
      key: i,
      className: 'pp-steps__bar' + (i <= current ? ' pp-steps__bar--done' : '')
    });
  })), /*#__PURE__*/React.createElement("div", {
    className: "pp-steps__label"
  }, /*#__PURE__*/React.createElement("span", null, "Passo ", current + 1, " de ", steps.length), /*#__PURE__*/React.createElement("b", null, steps[current])));
}
Object.assign(__ds_scope, { ProgressSteps });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/ProgressSteps.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Tabs({
  tabs = [],
  value,
  defaultValue,
  onChange,
  className = '',
  ...rest
}) {
  const [inner, setInner] = React.useState(defaultValue != null ? defaultValue : tabs[0] && tabs[0].value);
  const cur = value !== undefined ? value : inner;
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "tablist",
    className: 'pp-tabs ' + className
  }, rest), tabs.map(function (t) {
    return /*#__PURE__*/React.createElement("button", {
      key: t.value,
      role: "tab",
      type: "button",
      className: "pp-tab",
      "aria-selected": cur === t.value,
      onClick: function () {
        setInner(t.value);
        if (onChange) onChange(t.value);
      }
    }, t.icon, t.label, t.count != null ? /*#__PURE__*/React.createElement("span", {
      className: "pp-tab__count"
    }, t.count) : null);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/Dashboard.jsx
try { (() => {
(() => {
  const {
    Icon,
    Button,
    StatCard,
    Badge,
    Avatar
  } = window.PrimePadelDesignSystem_093c26;
  const {
    COURTS,
    NOW,
    STATUS,
    hm,
    fmt
  } = window.AD;
  function Dashboard({
    bookings,
    open,
    go
  }) {
    const active = bookings.filter(b => b.status !== 'cancelada');
    const paid = active.filter(b => b.status === 'confirmada');
    const revenue = paid.reduce((s, b) => s + b.value, 0);
    const slotsTotal = COURTS.length * 16 * 60;
    const used = active.reduce((s, b) => s + b.dur, 0);
    const occ = Math.round(used / slotsTotal * 100);
    const pend = bookings.filter(b => b.status === 'pendente');
    const checkins = paid.filter(b => b.checkin).length;
    const upcoming = active.filter(b => b.start >= NOW - 30 && b.status !== 'bloqueado').sort((a, b) => a.start - b.start).slice(0, 5);
    const week = [['Qua', 64], ['Qui', 71], ['Sex', 88], ['Sáb', 94], ['Dom', 82], ['Seg', 58], ['Ter', occ]];
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "ad-kpis"
    }, /*#__PURE__*/React.createElement(StatCard, {
      variant: "brand",
      label: "Ocupa\xE7\xE3o hoje",
      value: occ,
      unit: "%",
      progress: occ,
      foot: Math.round(used / 60) + 'h de ' + slotsTotal / 60 + 'h vendidas'
    }), /*#__PURE__*/React.createElement(StatCard, {
      label: "Reservas hoje",
      value: active.length,
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "calendar-check",
        size: 18
      }),
      delta: "+3",
      foot: "vs. ter\xE7a passada"
    }), /*#__PURE__*/React.createElement(StatCard, {
      label: "Receita do dia",
      value: fmt(revenue),
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "wallet",
        size: 18
      }),
      delta: "+12%",
      foot: "confirmada"
    }), /*#__PURE__*/React.createElement(StatCard, {
      label: "Check-ins",
      value: checkins,
      unit: '/ ' + paid.length,
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "scan-line",
        size: 18
      }),
      foot: "jogadores na arena"
    })), /*#__PURE__*/React.createElement("div", {
      className: "ad-cols"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ad-stack"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ad-panel"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ad-panel__head"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "ad-panel__title"
    }, "Agora nas quadras"), /*#__PURE__*/React.createElement("div", {
      className: "ad-panel__sub"
    }, "Atualizado \xE0s ", hm(NOW))), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm",
      onClick: () => go('agenda'),
      iconRight: /*#__PURE__*/React.createElement(Icon, {
        name: "arrow-right",
        size: 16
      })
    }, "Abrir agenda")), /*#__PURE__*/React.createElement("div", {
      className: "ad-live"
    }, COURTS.map(c => {
      const cur = active.find(b => b.court === c.id && b.start <= NOW && b.start + b.dur > NOW);
      const nxt = active.filter(b => b.court === c.id && b.start > NOW).sort((a, b) => a.start - b.start)[0];
      const pct = cur ? Math.round((NOW - cur.start) / cur.dur * 100) : 0;
      return /*#__PURE__*/React.createElement("div", {
        key: c.id,
        className: 'ad-court' + (cur && cur.status === 'confirmada' ? ' ad-court--busy' : ''),
        onClick: () => (cur || nxt) && open(cur || nxt)
      }, /*#__PURE__*/React.createElement("div", {
        className: "ad-court__top"
      }, /*#__PURE__*/React.createElement("span", {
        className: "ad-court__name"
      }, c.name), cur ? /*#__PURE__*/React.createElement(Badge, {
        tone: cur.status === 'confirmada' ? 'ball' : STATUS[cur.status].tone,
        size: "sm"
      }, cur.status === 'confirmada' ? 'Em jogo' : cur.status === 'pendente' ? 'Pendente' : STATUS[cur.status].label) : /*#__PURE__*/React.createElement(Badge, {
        tone: "neutral",
        size: "sm"
      }, "Livre")), cur ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        className: "ad-court__who"
      }, cur.client), /*#__PURE__*/React.createElement("div", {
        className: "ad-court__when"
      }, hm(cur.start), "\u2013", hm(cur.start + cur.dur))) : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        className: "ad-court__who"
      }, "Sem jogo agora"), /*#__PURE__*/React.createElement("div", {
        className: "ad-court__when"
      }, nxt ? 'Próxima às ' + hm(nxt.start) : 'Livre até o fechamento')), /*#__PURE__*/React.createElement("div", {
        className: "ad-prog"
      }, /*#__PURE__*/React.createElement("i", {
        style: {
          width: pct + '%'
        }
      })));
    }))), /*#__PURE__*/React.createElement("div", {
      className: "ad-panel"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ad-panel__head"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "ad-panel__title"
    }, "Ocupa\xE7\xE3o da semana"), /*#__PURE__*/React.createElement("div", {
      className: "ad-panel__sub"
    }, "M\xE9dia 77% \xB7 hor\xE1rio nobre 96%"))), /*#__PURE__*/React.createElement("div", {
      className: "ad-chart"
    }, week.map(([d, v], i) => /*#__PURE__*/React.createElement("div", {
      key: d,
      className: 'ad-bar' + (i === 6 ? ' ad-bar--today' : '')
    }, /*#__PURE__*/React.createElement("span", {
      className: "ad-bar__val"
    }, v, "%"), /*#__PURE__*/React.createElement("span", {
      className: "ad-bar__fill",
      style: {
        height: v * 1.2 + 'px'
      }
    }), /*#__PURE__*/React.createElement("span", {
      className: "ad-bar__lbl"
    }, i === 6 ? 'Hoje' : d)))))), /*#__PURE__*/React.createElement("div", {
      className: "ad-stack"
    }, pend.length ? /*#__PURE__*/React.createElement("div", {
      className: "ad-alert"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "clock-alert",
      size: 20
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("b", null, pend.length, " pagamentos pendentes"), " para hoje \xE0 noite."), /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "secondary",
      onClick: () => go('reservas', 'pendente')
    }, "Ver")) : null, /*#__PURE__*/React.createElement("div", {
      className: "ad-panel"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ad-panel__head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ad-panel__title"
    }, "Pr\xF3ximas reservas"), /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm",
      onClick: () => go('reservas')
    }, "Ver todas")), /*#__PURE__*/React.createElement("div", {
      className: "ad-list"
    }, upcoming.map(b => /*#__PURE__*/React.createElement("div", {
      key: b.id,
      className: "ad-li",
      onClick: () => open(b)
    }, /*#__PURE__*/React.createElement("div", {
      className: "ad-li__time"
    }, hm(b.start), /*#__PURE__*/React.createElement("small", null, b.dur, " min")), /*#__PURE__*/React.createElement(Avatar, {
      name: b.client,
      size: "sm"
    }), /*#__PURE__*/React.createElement("div", {
      className: "ad-li__txt"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ad-li__name"
    }, b.client), /*#__PURE__*/React.createElement("div", {
      className: "ad-li__meta"
    }, window.AD.courtName(b.court), b.plan ? ' · ' + b.plan : '')), /*#__PURE__*/React.createElement(Badge, {
      tone: STATUS[b.status].tone,
      dot: true,
      size: "sm"
    }, b.status === 'pendente' ? 'Pendente' : STATUS[b.status].label))))))));
  }
  window.Dashboard = Dashboard;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/Dashboard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/Dialogs.jsx
try { (() => {
(() => {
  const {
    Icon,
    Button,
    Dialog,
    Badge,
    Avatar,
    Input,
    Select,
    SegmentedControl
  } = window.PrimePadelDesignSystem_093c26;
  const {
    COURTS,
    STATUS,
    hm,
    fmt,
    courtName
  } = window.AD;
  function BookingDrawer({
    booking,
    onClose,
    onCheckin,
    onCancel,
    onConfirmPay
  }) {
    const [confirm, setConfirm] = React.useState(false);
    if (!booking) return null;
    const b = booking,
      st = STATUS[b.status];
    const isRes = b.status !== 'aula' && b.status !== 'bloqueado';
    const footer = isRes && b.status !== 'cancelada' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      onClick: () => setConfirm(true),
      style: {
        color: 'var(--pp-danger-600)',
        marginRight: 'auto'
      }
    }, "Cancelar reserva"), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary"
    }, "Remarcar"), b.status === 'pendente' ? /*#__PURE__*/React.createElement(Button, {
      onClick: () => onConfirmPay(b),
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "check",
        size: 18
      })
    }, "Confirmar pagamento") : /*#__PURE__*/React.createElement(Button, {
      disabled: b.checkin,
      onClick: () => onCheckin(b),
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "scan-line",
        size: 18
      })
    }, b.checkin ? 'Check-in feito' : 'Marcar check-in')) : null;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Dialog, {
      open: true,
      variant: "drawer",
      onClose: onClose,
      title: b.client,
      description: b.id + ' · ' + courtName(b.court),
      footer: footer
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      tone: st.tone,
      dot: true
    }, st.label), b.plan ? /*#__PURE__*/React.createElement(Badge, {
      tone: "solid"
    }, b.plan) : null, b.checkin && b.status === 'confirmada' ? /*#__PURE__*/React.createElement(Badge, {
      tone: "ball"
    }, "Check-in feito") : null), /*#__PURE__*/React.createElement("div", {
      className: "ad-sep"
    }), /*#__PURE__*/React.createElement("div", {
      className: "ad-dl"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("small", null, "Data"), /*#__PURE__*/React.createElement("b", null, "Ter, 13 out")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("small", null, "Hor\xE1rio"), /*#__PURE__*/React.createElement("b", null, hm(b.start), "\u2013", hm(b.start + b.dur))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("small", null, "Quadra"), /*#__PURE__*/React.createElement("b", null, courtName(b.court))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("small", null, "Dura\xE7\xE3o"), /*#__PURE__*/React.createElement("b", null, b.dur, " min")), isRes ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("small", null, "Valor"), /*#__PURE__*/React.createElement("b", null, fmt(b.value))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("small", null, "Pagamento"), /*#__PURE__*/React.createElement("b", null, b.pay))) : null), isRes ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "ad-sep"
    }), /*#__PURE__*/React.createElement("div", {
      className: "ad-who"
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: b.client,
      size: "md"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("b", null, b.client), /*#__PURE__*/React.createElement("small", null, b.phone)), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "message-circle",
        size: 16
      })
    }, "WhatsApp")), /*#__PURE__*/React.createElement("div", {
      className: "ad-sep"
    }), /*#__PURE__*/React.createElement(Input, {
      label: "Observa\xE7\xE3o interna",
      optional: true,
      multiline: true,
      rows: 3,
      placeholder: "Vis\xEDvel s\xF3 para a equipe"
    })) : null), /*#__PURE__*/React.createElement(Dialog, {
      open: confirm,
      onClose: () => setConfirm(false),
      title: "Cancelar reserva?",
      description: b.client + ' · ' + hm(b.start) + ' · ' + courtName(b.court),
      width: 440,
      footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
        variant: "secondary",
        onClick: () => setConfirm(false)
      }, "Voltar"), /*#__PURE__*/React.createElement(Button, {
        variant: "danger",
        onClick: () => {
          setConfirm(false);
          onCancel(b);
        }
      }, "Cancelar reserva"))
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        font: '400 15px/1.5 var(--font-sans)',
        color: 'var(--text-secondary)'
      }
    }, "O hor\xE1rio volta a ficar livre na agenda. Com mais de 24h de anteced\xEAncia, o valor vira cr\xE9dito para o cliente.")));
  }
  function NewBookingDialog({
    open,
    preset,
    onClose,
    onCreate
  }) {
    const [f, setF] = React.useState({});
    React.useEffect(() => {
      if (open) setF({
        client: '',
        phone: '',
        court: preset && preset.court || 'q1',
        start: preset && preset.start || 19 * 60,
        dur: '90',
        pay: 'Pix'
      });
    }, [open]);
    if (!open) return null;
    const set = p => setF(prev => Object.assign({}, prev, p));
    const startOpts = Array.from({
      length: 31
    }, (_, i) => 7 * 60 + i * 30).map(v => ({
      value: String(v),
      label: hm(v)
    }));
    const peak = f.start >= 18 * 60 && f.start < 22 * 60;
    const base = f.court === 'q1' ? peak ? 180 : 150 : peak ? 160 : 130;
    const value = Math.round(base * Number(f.dur || 90) / 60);
    return /*#__PURE__*/React.createElement(Dialog, {
      open: true,
      onClose: onClose,
      title: "Nova reserva",
      description: "Ter, 13 out",
      width: 540,
      footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
        variant: "secondary",
        onClick: onClose
      }, "Cancelar"), /*#__PURE__*/React.createElement(Button, {
        disabled: !f.client,
        onClick: () => onCreate({
          client: f.client,
          phone: f.phone || '—',
          court: f.court,
          start: Number(f.start),
          dur: Number(f.dur),
          value,
          pay: f.pay,
          status: f.pay === 'Pix' ? 'pendente' : 'confirmada'
        })
      }, "Criar reserva \xB7 ", fmt(value)))
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(Input, {
      label: "Cliente",
      placeholder: "Nome do cliente",
      value: f.client || '',
      onChange: e => set({
        client: e.target.value
      }),
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "user",
        size: 17
      })
    }), /*#__PURE__*/React.createElement(Input, {
      label: "WhatsApp",
      optional: true,
      placeholder: "(11) 90000-0000",
      value: f.phone || '',
      onChange: e => set({
        phone: e.target.value
      })
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(Select, {
      label: "Quadra",
      value: f.court,
      onChange: e => set({
        court: e.target.value
      }),
      options: COURTS.map(c => ({
        value: c.id,
        label: c.name
      }))
    }), /*#__PURE__*/React.createElement(Select, {
      label: "In\xEDcio",
      value: String(f.start),
      onChange: e => set({
        start: Number(e.target.value)
      }),
      options: startOpts
    })), /*#__PURE__*/React.createElement("div", {
      className: "pp-field"
    }, /*#__PURE__*/React.createElement("span", {
      className: "pp-field__label"
    }, "Dura\xE7\xE3o"), /*#__PURE__*/React.createElement(SegmentedControl, {
      block: true,
      options: [{
        value: '60',
        label: '60 min'
      }, {
        value: '90',
        label: '90 min'
      }, {
        value: '120',
        label: '120 min'
      }],
      value: f.dur,
      onChange: v => set({
        dur: v
      })
    })), /*#__PURE__*/React.createElement(Select, {
      label: "Pagamento",
      value: f.pay,
      onChange: e => set({
        pay: e.target.value
      }),
      options: ['Pix', 'Cartão', 'Na arena'],
      hint: f.pay === 'Pix' ? 'Enviaremos o link de pagamento por WhatsApp' : undefined
    })));
  }
  Object.assign(window, {
    BookingDrawer,
    NewBookingDialog
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/Dialogs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/Screens.jsx
try { (() => {
(() => {
  const {
    Icon,
    IconButton,
    Button,
    SegmentedControl,
    Badge,
    Chip,
    Tabs,
    Table,
    Avatar,
    Input
  } = window.PrimePadelDesignSystem_093c26;
  const {
    COURTS,
    NOW,
    STATUS,
    hm,
    fmt,
    courtName
  } = window.AD;
  const START = 7,
    END = 23,
    HOUR = 64;
  function useMobile() {
    const q = '(max-width: 899px)';
    const [mob, setMob] = React.useState(window.matchMedia(q).matches);
    React.useEffect(() => {
      const mq = window.matchMedia(q);
      const on = () => setMob(mq.matches);
      mq.addEventListener('change', on);
      return () => mq.removeEventListener('change', on);
    }, []);
    return mob;
  }
  function Agenda({
    bookings,
    open,
    onNewAt
  }) {
    const mob = useMobile();
    const [court, setCourt] = React.useState('q1');
    const [filter, setFilter] = React.useState('todas');
    const cols = mob ? COURTS.filter(c => c.id === court) : COURTS;
    const scrollRef = React.useRef(null);
    React.useEffect(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = (17 - START) * HOUR;
    }, []);
    const vis = bookings.filter(b => b.status !== 'cancelada' && (filter === 'todas' || b.status === filter));
    const occ = cid => {
      const u = bookings.filter(b => b.court === cid && b.status !== 'cancelada').reduce((s, b) => s + b.dur, 0);
      return Math.round(u / ((END - START) * 60) * 100);
    };
    const hours = Array.from({
      length: END - START
    }, (_, i) => START + i);
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "ad-toolbar"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ad-daynav"
    }, /*#__PURE__*/React.createElement(IconButton, {
      variant: "secondary",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "chevron-left",
        size: 18
      }),
      label: "Dia anterior"
    }), /*#__PURE__*/React.createElement("b", null, "Ter, 13 out"), /*#__PURE__*/React.createElement(IconButton, {
      variant: "secondary",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "chevron-right",
        size: 18
      }),
      label: "Pr\xF3ximo dia"
    }), /*#__PURE__*/React.createElement(Button, {
      variant: "tint",
      size: "sm"
    }, "Hoje")), /*#__PURE__*/React.createElement("div", {
      className: "ad-toolbar__group"
    }, [['todas', 'Todas'], ['pendente', 'Pendentes'], ['aula', 'Aulas'], ['bloqueado', 'Bloqueios']].map(([k, l]) => /*#__PURE__*/React.createElement(Chip, {
      key: k,
      selected: filter === k,
      onClick: () => setFilter(k)
    }, l)))), mob ? /*#__PURE__*/React.createElement(SegmentedControl, {
      block: true,
      tone: "brand",
      options: COURTS.map(c => ({
        value: c.id,
        label: c.name
      })),
      value: court,
      onChange: setCourt
    }) : null, /*#__PURE__*/React.createElement("div", {
      className: "ag",
      style: {
        '--hour': HOUR + 'px',
        '--cols': cols.length
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "ag-scroll",
      ref: scrollRef
    }, /*#__PURE__*/React.createElement("div", {
      className: "ag-grid"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ag-head"
    }), cols.map(c => /*#__PURE__*/React.createElement("div", {
      key: c.id,
      className: "ag-head"
    }, /*#__PURE__*/React.createElement("span", {
      className: "ag-head__name"
    }, c.name), /*#__PURE__*/React.createElement("span", {
      className: "ag-head__occ"
    }, occ(c.id), "% ocupada"))), /*#__PURE__*/React.createElement("div", {
      className: "ag-times"
    }, hours.map(h => /*#__PURE__*/React.createElement("div", {
      key: h,
      className: "ag-time"
    }, String(h).padStart(2, '0'), ":00"))), cols.map(c => /*#__PURE__*/React.createElement("div", {
      key: c.id,
      className: "ag-col",
      style: {
        height: hours.length * HOUR
      },
      onClick: e => {
        if (e.target !== e.currentTarget) return;
        const y = e.nativeEvent.offsetY;
        const min = START * 60 + Math.floor(y / (HOUR / 2)) * 30;
        onNewAt(c.id, min);
      }
    }, vis.filter(b => b.court === c.id).map(b => {
      const top = (b.start - START * 60) / 60 * HOUR + 2,
        h = b.dur / 60 * HOUR - 4;
      return /*#__PURE__*/React.createElement("div", {
        key: b.id,
        className: 'ag-ev ag-ev--' + b.status + (b.checkin && b.status === 'confirmada' ? ' ag-ev--checkin' : ''),
        style: {
          top,
          height: h
        },
        onClick: () => open(b)
      }, /*#__PURE__*/React.createElement("b", null, b.client), /*#__PURE__*/React.createElement("span", null, hm(b.start), "\u2013", hm(b.start + b.dur), b.status === 'pendente' ? ' · Pendente' : b.plan ? ' · ' + b.plan : ''));
    }), /*#__PURE__*/React.createElement("div", {
      className: "ag-now",
      style: {
        top: (NOW - START * 60) / 60 * HOUR
      }
    }))))), /*#__PURE__*/React.createElement("div", {
      className: "ag-legend"
    }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("i", {
      style: {
        background: 'var(--status-booked-bg)'
      }
    }), "Confirmada"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("i", {
      style: {
        background: 'var(--status-pending-bg)',
        boxShadow: 'inset 0 0 0 1px rgba(154,95,14,.3)'
      }
    }), "Aguardando pagamento"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("i", {
      style: {
        background: 'var(--status-class-bg)'
      }
    }), "Aula"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("i", {
      style: {
        background: 'var(--pp-neutral-100)',
        boxShadow: 'inset 0 0 0 1px var(--border-strong)'
      }
    }), "Bloqueado"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("i", {
      style: {
        background: 'var(--pp-ball)',
        borderRadius: '50%'
      }
    }), "Check-in feito"), /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: 'auto'
      }
    }, "Toque num espa\xE7o vazio para criar uma reserva"))));
  }
  function Bookings({
    bookings,
    open,
    initialTab
  }) {
    const [tab, setTab] = React.useState(initialTab || 'todas');
    const [q, setQ] = React.useState('');
    const counts = s => bookings.filter(b => s === 'todas' || b.status === s).length;
    const rows = bookings.filter(b => b.status !== 'bloqueado' && b.status !== 'aula' && (tab === 'todas' || b.status === tab) && (!q || b.client.toLowerCase().includes(q.toLowerCase()))).sort((a, b) => a.start - b.start);
    const cols = [{
      key: 'client',
      header: 'Cliente',
      primary: true,
      render: b => /*#__PURE__*/React.createElement("div", {
        className: "ad-who"
      }, /*#__PURE__*/React.createElement(Avatar, {
        name: b.client,
        size: "sm"
      }), /*#__PURE__*/React.createElement("div", {
        style: {
          minWidth: 0
        }
      }, /*#__PURE__*/React.createElement("b", null, b.client), /*#__PURE__*/React.createElement("small", null, b.phone)))
    }, {
      key: 'when',
      header: 'Horário',
      num: true,
      render: b => /*#__PURE__*/React.createElement("span", null, hm(b.start), "\u2013", hm(b.start + b.dur))
    }, {
      key: 'court',
      header: 'Quadra',
      render: b => courtName(b.court)
    }, {
      key: 'status',
      header: 'Status',
      render: b => /*#__PURE__*/React.createElement(Badge, {
        tone: STATUS[b.status].tone,
        dot: true
      }, STATUS[b.status].label)
    }, {
      key: 'pay',
      header: 'Pagamento'
    }, {
      key: 'value',
      header: 'Valor',
      align: 'right',
      num: true,
      render: b => /*#__PURE__*/React.createElement("b", {
        style: {
          fontWeight: 600
        }
      }, fmt(b.value))
    }];
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Tabs, {
      value: tab,
      onChange: setTab,
      tabs: [{
        value: 'todas',
        label: 'Todas',
        count: counts('todas') - counts('aula') - counts('bloqueado')
      }, {
        value: 'confirmada',
        label: 'Confirmadas',
        count: counts('confirmada')
      }, {
        value: 'pendente',
        label: 'Pendentes',
        count: counts('pendente')
      }, {
        value: 'cancelada',
        label: 'Canceladas',
        count: counts('cancelada')
      }]
    }), /*#__PURE__*/React.createElement("div", {
      className: "ad-toolbar"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: '1 1 260px',
        maxWidth: 360
      }
    }, /*#__PURE__*/React.createElement(Input, {
      size: "sm",
      placeholder: "Buscar por nome",
      value: q,
      onChange: e => setQ(e.target.value),
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "search",
        size: 17
      })
    })), /*#__PURE__*/React.createElement("div", {
      className: "ad-toolbar__group"
    }, /*#__PURE__*/React.createElement(Chip, {
      selected: true
    }, "Hoje"), /*#__PURE__*/React.createElement(Chip, null, "Amanh\xE3"), /*#__PURE__*/React.createElement(Chip, null, "Esta semana"), /*#__PURE__*/React.createElement(IconButton, {
      variant: "secondary",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "download",
        size: 18
      }),
      label: "Exportar"
    }))), rows.length ? /*#__PURE__*/React.createElement(Table, {
      columns: cols,
      rows: rows,
      onRowClick: open
    }) : /*#__PURE__*/React.createElement("div", {
      className: "ad-panel ad-empty"
    }, /*#__PURE__*/React.createElement("span", {
      className: "ad-empty__ic"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "search-x",
      size: 24
    })), /*#__PURE__*/React.createElement("h2", null, "Nada por aqui"), /*#__PURE__*/React.createElement("p", null, "Nenhuma reserva com esse filtro.")));
  }
  function Clients() {
    const rows = window.AD.CLIENTS;
    const cols = [{
      key: 'name',
      header: 'Cliente',
      primary: true,
      render: c => /*#__PURE__*/React.createElement("div", {
        className: "ad-who"
      }, /*#__PURE__*/React.createElement(Avatar, {
        name: c.name,
        size: "sm"
      }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, c.name), /*#__PURE__*/React.createElement("small", null, c.phone)))
    }, {
      key: 'plan',
      header: 'Plano',
      render: c => /*#__PURE__*/React.createElement(Badge, {
        tone: c.plan === 'Mensalista' ? 'solid' : c.plan === 'Avulso' ? 'outline' : 'brand'
      }, c.plan)
    }, {
      key: 'visits',
      header: 'Jogos',
      num: true,
      align: 'right'
    }, {
      key: 'last',
      header: 'Último jogo'
    }, {
      key: 'spent',
      header: 'Total gasto',
      num: true,
      align: 'right',
      render: c => fmt(c.spent)
    }];
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "ad-toolbar"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: '1 1 260px',
        maxWidth: 360
      }
    }, /*#__PURE__*/React.createElement(Input, {
      size: "sm",
      placeholder: "Buscar cliente",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "search",
        size: 17
      })
    })), /*#__PURE__*/React.createElement("div", {
      className: "ad-toolbar__group"
    }, /*#__PURE__*/React.createElement(Chip, {
      selected: true,
      count: rows.length
    }, "Todos"), /*#__PURE__*/React.createElement(Chip, {
      count: 2
    }, "Mensalistas"), /*#__PURE__*/React.createElement(Chip, {
      count: 2
    }, "Pacote"), /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "secondary",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "user-plus",
        size: 16
      })
    }, "Novo cliente"))), /*#__PURE__*/React.createElement(Table, {
      columns: cols,
      rows: rows,
      onRowClick: () => {}
    }));
  }
  Object.assign(window, {
    Agenda,
    Bookings,
    Clients
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/Screens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/Shell.jsx
try { (() => {
(() => {
  const {
    Icon,
    IconButton,
    Button,
    Logo,
    Avatar,
    Input
  } = window.PrimePadelDesignSystem_093c26;
  const NAV = [{
    id: 'dashboard',
    label: 'Visão geral',
    icon: 'layout-dashboard'
  }, {
    id: 'agenda',
    label: 'Agenda',
    icon: 'calendar-days'
  }, {
    id: 'reservas',
    label: 'Reservas',
    icon: 'list-checks',
    count: 2
  }, {
    id: 'clientes',
    label: 'Clientes',
    icon: 'users'
  }];
  const NAV2 = [{
    id: 'financeiro',
    label: 'Financeiro',
    icon: 'wallet'
  }, {
    id: 'quadras',
    label: 'Quadras',
    icon: 'rectangle-horizontal'
  }, {
    id: 'config',
    label: 'Configurações',
    icon: 'settings'
  }];
  function Sidebar({
    page,
    go
  }) {
    const item = n => /*#__PURE__*/React.createElement("button", {
      key: n.id,
      className: 'ad-nav' + (page === n.id ? ' is-on' : ''),
      onClick: () => go(n.id)
    }, /*#__PURE__*/React.createElement(Icon, {
      name: n.icon,
      size: 19
    }), n.label, n.count ? /*#__PURE__*/React.createElement("span", {
      className: "ad-nav__count"
    }, n.count) : null);
    return /*#__PURE__*/React.createElement("aside", {
      className: "ad-side"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ad-side__logo"
    }, /*#__PURE__*/React.createElement(Logo, {
      color: "white",
      height: 46,
      basePath: "../../"
    })), /*#__PURE__*/React.createElement("nav", null, NAV.map(item), /*#__PURE__*/React.createElement("div", {
      className: "ad-side__label"
    }, "Gest\xE3o"), NAV2.map(item)), /*#__PURE__*/React.createElement("div", {
      className: "ad-side__foot"
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: "Camila Souza",
      size: "sm",
      tone: "brand",
      style: {
        background: 'rgba(255,255,255,.14)'
      }
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "Camila Souza"), /*#__PURE__*/React.createElement("span", null, "Recep\xE7\xE3o \xB7 Arena"))));
  }
  function Topbar({
    title,
    subtitle,
    onNew,
    actions
  }) {
    return /*#__PURE__*/React.createElement("header", {
      className: "ad-top"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ad-top__in"
    }, /*#__PURE__*/React.createElement("span", {
      className: "ad-top__mlogo"
    }, /*#__PURE__*/React.createElement(Logo, {
      color: "green",
      height: 30,
      basePath: "../../"
    })), /*#__PURE__*/React.createElement("div", {
      className: "ad-top__title"
    }, /*#__PURE__*/React.createElement("h1", null, title), subtitle ? /*#__PURE__*/React.createElement("p", null, subtitle) : null), actions, /*#__PURE__*/React.createElement("div", {
      className: "ad-top__search"
    }, /*#__PURE__*/React.createElement(Input, {
      size: "sm",
      placeholder: "Buscar cliente ou reserva",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "search",
        size: 17
      })
    })), /*#__PURE__*/React.createElement(IconButton, {
      variant: "secondary",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "bell",
        size: 19
      }),
      label: "Notifica\xE7\xF5es",
      badge: 2
    }), /*#__PURE__*/React.createElement(Button, {
      className: "ad-desk",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "plus",
        size: 18
      }),
      onClick: onNew
    }, "Nova reserva")));
  }
  function BottomNav({
    page,
    go,
    onNew
  }) {
    const b = (id, icon, label) => /*#__PURE__*/React.createElement("button", {
      className: page === id ? 'is-on' : '',
      onClick: () => go(id)
    }, /*#__PURE__*/React.createElement(Icon, {
      name: icon,
      size: 22
    }), label);
    return /*#__PURE__*/React.createElement("nav", {
      className: "ad-bnav"
    }, b('dashboard', 'layout-dashboard', 'Início'), b('agenda', 'calendar-days', 'Agenda'), /*#__PURE__*/React.createElement("button", {
      "aria-label": "Nova reserva",
      onClick: onNew
    }, /*#__PURE__*/React.createElement("span", {
      className: "ad-bnav__fab",
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 24
    }))), b('reservas', 'list-checks', 'Reservas'), b('clientes', 'users', 'Clientes'));
  }
  function OutOfScope({
    label
  }) {
    return /*#__PURE__*/React.createElement("div", {
      className: "ad-panel ad-empty"
    }, /*#__PURE__*/React.createElement("span", {
      className: "ad-empty__ic"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "layers",
      size: 24
    })), /*#__PURE__*/React.createElement("h2", null, label), /*#__PURE__*/React.createElement("p", {
      style: {
        maxWidth: 420
      }
    }, "Esta \xE1rea n\xE3o foi desenhada neste kit. Componha-a com os mesmos padr\xF5es: StatCard, Table, Tabs e Dialog."));
  }
  Object.assign(window, {
    Sidebar,
    Topbar,
    BottomNav,
    OutOfScope,
    AD_NAV: NAV.concat(NAV2)
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/Shell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/data.jsx
try { (() => {
(() => {
  const COURTS = [{
    id: 'q1',
    name: 'Quadra 1',
    short: 'Q1'
  }, {
    id: 'q2',
    name: 'Quadra 2',
    short: 'Q2'
  }, {
    id: 'q3',
    name: 'Quadra 3',
    short: 'Q3'
  }];
  const NOW = 19 * 60 + 20;
  const m = (h, mm) => h * 60 + (mm || 0);
  const BOOKINGS = [{
    id: 'R-2041',
    court: 'q1',
    start: m(7),
    dur: 90,
    client: 'Carlos Menezes',
    phone: '(11) 99812-4410',
    status: 'confirmada',
    value: 225,
    pay: 'Pix',
    checkin: true
  }, {
    id: 'R-2042',
    court: 'q2',
    start: m(8),
    dur: 60,
    client: 'Aula · Prof. Thiago',
    phone: '—',
    status: 'aula',
    value: 0,
    pay: '—',
    checkin: true
  }, {
    id: 'R-2043',
    court: 'q3',
    start: m(8),
    dur: 120,
    client: 'Manutenção do piso',
    phone: '—',
    status: 'bloqueado',
    value: 0,
    pay: '—'
  }, {
    id: 'R-2044',
    court: 'q1',
    start: m(10),
    dur: 60,
    client: 'Fernanda Rocha',
    phone: '(11) 98455-0021',
    status: 'confirmada',
    value: 150,
    pay: 'Cartão',
    checkin: true
  }, {
    id: 'R-2045',
    court: 'q2',
    start: m(12),
    dur: 90,
    client: 'Lucas Andrade',
    phone: '(11) 97700-3388',
    status: 'confirmada',
    value: 195,
    pay: 'Pix',
    checkin: true
  }, {
    id: 'R-2046',
    court: 'q3',
    start: m(14),
    dur: 60,
    client: 'Clínica iniciantes',
    phone: '—',
    status: 'aula',
    value: 0,
    pay: '—',
    checkin: true
  }, {
    id: 'R-2047',
    court: 'q1',
    start: m(16),
    dur: 90,
    client: 'Beatriz Saldanha',
    phone: '(11) 99102-7765',
    status: 'confirmada',
    value: 225,
    pay: 'Pix',
    checkin: true
  }, {
    id: 'R-2048',
    court: 'q2',
    start: m(17),
    dur: 60,
    client: 'Rafael Lima',
    phone: '(11) 98123-0099',
    status: 'confirmada',
    value: 130,
    pay: 'Na arena',
    checkin: true
  }, {
    id: 'R-2049',
    court: 'q1',
    start: m(18, 30),
    dur: 90,
    client: 'Marina Couto',
    phone: '(11) 98765-4321',
    status: 'confirmada',
    value: 270,
    pay: 'Pix',
    checkin: true,
    plan: 'Mensalista'
  }, {
    id: 'R-2050',
    court: 'q2',
    start: m(18),
    dur: 120,
    client: 'Grupo Quinta 18h',
    phone: '(11) 99001-2233',
    status: 'confirmada',
    value: 320,
    pay: 'Pix',
    checkin: true,
    plan: 'Mensalista'
  }, {
    id: 'R-2051',
    court: 'q3',
    start: m(19),
    dur: 90,
    client: 'Pedro Alves',
    phone: '(11) 97456-1200',
    status: 'pendente',
    value: 240,
    pay: 'Pix'
  }, {
    id: 'R-2052',
    court: 'q1',
    start: m(20),
    dur: 60,
    client: 'Júlia Prado',
    phone: '(11) 99666-4545',
    status: 'confirmada',
    value: 180,
    pay: 'Cartão'
  }, {
    id: 'R-2053',
    court: 'q3',
    start: m(20, 30),
    dur: 90,
    client: 'Ana Beatriz Torres',
    phone: '(11) 98231-7788',
    status: 'pendente',
    value: 240,
    pay: 'Pix'
  }, {
    id: 'R-2054',
    court: 'q2',
    start: m(21),
    dur: 90,
    client: 'Gustavo Reis',
    phone: '(11) 99344-1010',
    status: 'confirmada',
    value: 240,
    pay: 'Pix'
  }, {
    id: 'R-2055',
    court: 'q1',
    start: m(21, 30),
    dur: 90,
    client: 'Thiago Nunes',
    phone: '(11) 98800-5566',
    status: 'confirmada',
    value: 270,
    pay: 'Pix'
  }, {
    id: 'R-2039',
    court: 'q3',
    start: m(17),
    dur: 60,
    client: 'Renata Prates',
    phone: '(11) 97001-8899',
    status: 'cancelada',
    value: 160,
    pay: 'Pix'
  }];
  const CLIENTS = [{
    id: 1,
    name: 'Marina Couto',
    phone: '(11) 98765-4321',
    plan: 'Mensalista',
    visits: 38,
    last: 'Hoje',
    spent: 6840
  }, {
    id: 2,
    name: 'Grupo Quinta 18h',
    phone: '(11) 99001-2233',
    plan: 'Mensalista',
    visits: 41,
    last: 'Hoje',
    spent: 9120
  }, {
    id: 3,
    name: 'Rafael Lima',
    phone: '(11) 98123-0099',
    plan: 'Pacote 10h',
    visits: 17,
    last: 'Hoje',
    spent: 2510
  }, {
    id: 4,
    name: 'Beatriz Saldanha',
    phone: '(11) 99102-7765',
    plan: 'Avulso',
    visits: 9,
    last: 'Hoje',
    spent: 1715
  }, {
    id: 5,
    name: 'Pedro Alves',
    phone: '(11) 97456-1200',
    plan: 'Avulso',
    visits: 3,
    last: '02 out',
    spent: 480
  }, {
    id: 6,
    name: 'Júlia Prado',
    phone: '(11) 99666-4545',
    plan: 'Pacote 10h',
    visits: 12,
    last: '09 out',
    spent: 1980
  }, {
    id: 7,
    name: 'Fernanda Rocha',
    phone: '(11) 98455-0021',
    plan: 'Avulso',
    visits: 6,
    last: 'Hoje',
    spent: 900
  }];
  const STATUS = {
    confirmada: {
      label: 'Confirmada',
      tone: 'success'
    },
    pendente: {
      label: 'Aguardando pagamento',
      tone: 'warning'
    },
    aula: {
      label: 'Aula',
      tone: 'info'
    },
    bloqueado: {
      label: 'Bloqueado',
      tone: 'neutral'
    },
    cancelada: {
      label: 'Cancelada',
      tone: 'danger'
    }
  };
  const hm = min => String(Math.floor(min / 60)).padStart(2, '0') + ':' + String(min % 60).padStart(2, '0');
  const fmt = n => 'R$ ' + n.toLocaleString('pt-BR');
  const courtName = id => COURTS.find(c => c.id === id).name;
  window.AD = {
    COURTS,
    NOW,
    BOOKINGS,
    CLIENTS,
    STATUS,
    hm,
    fmt,
    courtName,
    m
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/data.jsx", error: String((e && e.message) || e) }); }

// ui_kits/booking/Steps.jsx
try { (() => {
(() => {
  const {
    Icon,
    IconButton,
    Button,
    DateStrip,
    TimeSlot,
    CourtCard,
    Chip,
    SegmentedControl,
    Input,
    Checkbox,
    Badge
  } = window.PrimePadelDesignSystem_093c26;
  const {
    DAYS,
    COURTS,
    HOURS,
    PERIODS,
    ADDONS,
    isPeak,
    rate,
    fmt,
    hh,
    taken,
    freeCount
  } = window.BK;
  const BASE = '../../';
  function StepTime({
    b,
    set
  }) {
    const court = COURTS.find(c => c.id === b.court);
    const [p0, p1] = PERIODS[b.period];
    const hours = HOURS.filter(h => h >= p0 && h <= p1);
    const free = hours.filter(h => !taken(b.day, b.court, h));
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "bk-block"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bk-block__head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bk-block__title"
    }, "Quando voc\xEA quer jogar?")), /*#__PURE__*/React.createElement(DateStrip, {
      days: DAYS,
      value: b.day,
      onChange: day => set({
        day,
        hour: null
      })
    }), /*#__PURE__*/React.createElement(SegmentedControl, {
      block: true,
      options: [{
        value: '60',
        label: '60 min'
      }, {
        value: '90',
        label: '90 min'
      }, {
        value: '120',
        label: '120 min'
      }],
      value: String(b.duration),
      onChange: v => set({
        duration: Number(v)
      })
    })), /*#__PURE__*/React.createElement("div", {
      className: "bk-block"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bk-block__head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bk-block__title"
    }, "Quadra"), /*#__PURE__*/React.createElement("span", {
      style: {
        font: '400 13px var(--font-sans)',
        color: 'var(--text-secondary)'
      }
    }, "Todas cobertas")), /*#__PURE__*/React.createElement("div", {
      className: "bk-courts"
    }, COURTS.map(c => /*#__PURE__*/React.createElement(CourtCard, {
      key: c.id,
      compact: true,
      name: c.name,
      tags: c.tags,
      basePath: BASE,
      selected: b.court === c.id,
      price: fmt(c.off) + '+',
      availability: freeCount(b.day, c.id) + ' horários livres',
      onClick: () => set({
        court: c.id,
        hour: null
      })
    })))), /*#__PURE__*/React.createElement("div", {
      className: "bk-block"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bk-block__head"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "bk-block__title"
    }, "Hor\xE1rio"), /*#__PURE__*/React.createElement("div", {
      className: "bk-block__sub"
    }, "Pre\xE7o por ", b.duration, " min na ", court.name))), /*#__PURE__*/React.createElement("div", {
      className: "bk-row"
    }, [['manha', 'Manhã', 'sunrise'], ['tarde', 'Tarde', 'sun'], ['noite', 'Noite', 'moon']].map(([k, l, ic]) => /*#__PURE__*/React.createElement(Chip, {
      key: k,
      selected: b.period === k,
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: ic,
        size: 16
      }),
      onClick: () => set({
        period: k,
        hour: null
      })
    }, l))), free.length ? /*#__PURE__*/React.createElement("div", {
      className: "bk-slots"
    }, hours.map(h => {
      const t = taken(b.day, b.court, h);
      return /*#__PURE__*/React.createElement(TimeSlot, {
        key: h,
        time: hh(h),
        peak: isPeak(h),
        meta: t ? 'Reservado' : fmt(rate(court, h) * b.duration / 60),
        status: t ? 'unavailable' : b.hour === h ? 'selected' : 'available',
        onClick: () => set({
          hour: h
        })
      });
    })) : /*#__PURE__*/React.createElement("div", {
      className: "bk-empty"
    }, "Nenhum hor\xE1rio livre neste per\xEDodo.", /*#__PURE__*/React.createElement("br", null), "Que tal outro turno ou outra quadra?"), /*#__PURE__*/React.createElement("div", {
      className: "bk-legend"
    }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("i", {
      style: {
        background: 'var(--pp-ball)'
      }
    }), "Hor\xE1rio nobre (18h\u201322h)"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("i", {
      style: {
        background: 'var(--pp-neutral-300)'
      }
    }), "Reservado"))));
  }
  function StepDetails({
    b,
    set
  }) {
    const setQty = (id, d) => {
      const a = ADDONS.find(x => x.id === id);
      const v = Math.max(0, Math.min(a.max, (b.addons[id] || 0) + d));
      set({
        addons: Object.assign({}, b.addons, {
          [id]: v
        })
      });
    };
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "bk-block"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bk-block__head"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "bk-block__title"
    }, "Quem vai jogar?"), /*#__PURE__*/React.createElement("div", {
      className: "bk-block__sub"
    }, "Opcional \u2014 ajuda a recep\xE7\xE3o no check-in."))), /*#__PURE__*/React.createElement("div", {
      className: "bk-grid2"
    }, [0, 1, 2, 3].map(i => /*#__PURE__*/React.createElement(Input, {
      key: i,
      size: "sm",
      placeholder: i === 0 ? 'Você' : 'Jogador ' + (i + 1),
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "user",
        size: 16
      }),
      value: b.players[i] || '',
      onChange: e => {
        const p = b.players.slice();
        p[i] = e.target.value;
        set({
          players: p
        });
      }
    })))), /*#__PURE__*/React.createElement("div", {
      className: "bk-block"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bk-block__head"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "bk-block__title"
    }, "Extras"), /*#__PURE__*/React.createElement("div", {
      className: "bk-block__sub"
    }, "Retire na recep\xE7\xE3o ao chegar."))), /*#__PURE__*/React.createElement("div", null, ADDONS.map(a => /*#__PURE__*/React.createElement("div", {
      key: a.id,
      className: "bk-addon"
    }, /*#__PURE__*/React.createElement("span", {
      className: "bk-addon__ic"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: a.icon,
      size: 20
    })), /*#__PURE__*/React.createElement("div", {
      className: "bk-addon__txt"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bk-addon__name"
    }, a.name), /*#__PURE__*/React.createElement("div", {
      className: "bk-addon__price"
    }, fmt(a.price), " cada")), /*#__PURE__*/React.createElement("div", {
      className: "bk-qty"
    }, /*#__PURE__*/React.createElement(IconButton, {
      variant: "secondary",
      size: "md",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "minus",
        size: 18
      }),
      label: 'Menos ' + a.name,
      disabled: !b.addons[a.id],
      onClick: () => setQty(a.id, -1)
    }), /*#__PURE__*/React.createElement("b", null, b.addons[a.id] || 0), /*#__PURE__*/React.createElement(IconButton, {
      variant: "secondary",
      size: "md",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "plus",
        size: 18
      }),
      label: 'Mais ' + a.name,
      onClick: () => setQty(a.id, 1)
    })))))), /*#__PURE__*/React.createElement("div", {
      className: "bk-block"
    }, /*#__PURE__*/React.createElement(Input, {
      label: "Observa\xE7\xF5es",
      optional: true,
      multiline: true,
      rows: 3,
      placeholder: "Ex.: anivers\xE1rio, preciso de bola extra\u2026",
      value: b.notes,
      onChange: e => set({
        notes: e.target.value
      })
    })));
  }
  function StepPayment({
    b,
    set,
    errors
  }) {
    const opts = [['pix', 'Pix', 'Aprovação imediata', 'qr-code', true], ['card', 'Cartão de crédito', 'Visa, Master, Elo', 'credit-card'], ['arena', 'Pagar na arena', 'Garantia com cartão', 'store']];
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "bk-block"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bk-block__head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bk-block__title"
    }, "Seus dados")), /*#__PURE__*/React.createElement(Input, {
      label: "Nome completo",
      placeholder: "Como devemos te chamar?",
      value: b.name,
      onChange: e => set({
        name: e.target.value
      }),
      error: errors.name
    }), /*#__PURE__*/React.createElement("div", {
      className: "bk-grid2"
    }, /*#__PURE__*/React.createElement(Input, {
      label: "WhatsApp",
      placeholder: "(11) 90000-0000",
      inputMode: "tel",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "phone",
        size: 18
      }),
      value: b.phone,
      onChange: e => set({
        phone: e.target.value
      }),
      error: errors.phone,
      hint: "A confirma\xE7\xE3o chega por aqui"
    }), /*#__PURE__*/React.createElement(Input, {
      label: "E-mail",
      optional: true,
      placeholder: "voce@email.com",
      type: "email",
      value: b.email,
      onChange: e => set({
        email: e.target.value
      })
    }))), /*#__PURE__*/React.createElement("div", {
      className: "bk-block"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bk-block__head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bk-block__title"
    }, "Pagamento")), /*#__PURE__*/React.createElement("div", {
      className: "bk-pay",
      role: "radiogroup"
    }, opts.map(([k, n, d, ic, rec]) => /*#__PURE__*/React.createElement("div", {
      key: k,
      role: "radio",
      "aria-checked": b.pay === k,
      tabIndex: 0,
      className: 'bk-payopt' + (b.pay === k ? ' bk-payopt--on' : ''),
      onClick: () => set({
        pay: k
      })
    }, /*#__PURE__*/React.createElement("span", {
      className: "bk-payopt__ic"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: ic,
      size: 20
    })), /*#__PURE__*/React.createElement("div", {
      className: "bk-payopt__txt"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bk-payopt__name"
    }, n, rec ? /*#__PURE__*/React.createElement(Badge, {
      tone: "brand",
      size: "sm"
    }, "Recomendado") : null), /*#__PURE__*/React.createElement("div", {
      className: "bk-payopt__desc"
    }, d)), /*#__PURE__*/React.createElement("span", {
      className: "bk-dot"
    })))), b.pay === 'card' ? /*#__PURE__*/React.createElement("div", {
      className: "bk-grid2"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        gridColumn: '1/-1'
      }
    }, /*#__PURE__*/React.createElement(Input, {
      label: "N\xFAmero do cart\xE3o",
      placeholder: "0000 0000 0000 0000",
      inputMode: "numeric",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "credit-card",
        size: 18
      })
    })), /*#__PURE__*/React.createElement(Input, {
      label: "Validade",
      placeholder: "MM/AA"
    }), /*#__PURE__*/React.createElement(Input, {
      label: "CVV",
      placeholder: "123"
    })) : null, /*#__PURE__*/React.createElement("div", {
      className: "bk-note"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "info",
      size: 18
    }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, "Cancelamento gr\xE1tis at\xE9 24h antes."), " Depois disso, o valor fica como cr\xE9dito na arena.")), /*#__PURE__*/React.createElement(Checkbox, {
      label: "Li e concordo com a pol\xEDtica de reservas",
      checked: b.terms,
      onChange: e => set({
        terms: e.target.checked
      })
    }), errors.terms ? /*#__PURE__*/React.createElement("span", {
      style: {
        font: '400 13px var(--font-sans)',
        color: 'var(--pp-danger-600)',
        marginTop: -8
      }
    }, errors.terms) : null));
  }
  function StepDone({
    b,
    onRestart
  }) {
    const {
      court,
      total
    } = window.BK.calc(b);
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "bk-done"
    }, /*#__PURE__*/React.createElement("span", {
      className: "bk-done__circle"
    }), /*#__PURE__*/React.createElement("span", {
      className: "bk-done__check"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 30,
      strokeWidth: 2.25
    })), /*#__PURE__*/React.createElement("h1", null, "Reserva confirmada!"), /*#__PURE__*/React.createElement("p", null, "Tudo certo, ", (b.name || 'jogador').split(' ')[0], ". Enviamos os detalhes para o seu WhatsApp."), /*#__PURE__*/React.createElement("div", {
      className: "bk-ticket"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("small", null, "Data"), /*#__PURE__*/React.createElement("b", null, window.BK.longDate(b.day))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("small", null, "Hor\xE1rio"), /*#__PURE__*/React.createElement("b", null, hh(b.hour), " \xB7 ", b.duration, " min")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("small", null, "Quadra"), /*#__PURE__*/React.createElement("b", null, court.name)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("small", null, "Total pago"), /*#__PURE__*/React.createElement("b", null, fmt(total))))), /*#__PURE__*/React.createElement("div", {
      className: "bk-block"
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "lg",
      block: true,
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "calendar-plus",
        size: 18
      })
    }, "Adicionar \xE0 agenda"), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "lg",
      block: true,
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "share-2",
        size: 18
      })
    }, "Enviar para o grupo"), /*#__PURE__*/React.createElement(Button, {
      as: "a",
      href: "../landing/index.html",
      variant: "ghost",
      block: true,
      onClick: onRestart
    }, "Voltar ao in\xEDcio")));
  }
  Object.assign(window, {
    StepTime,
    StepDetails,
    StepPayment,
    StepDone
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/booking/Steps.jsx", error: String((e && e.message) || e) }); }

// ui_kits/booking/data.jsx
try { (() => {
(() => {
  const {
    Icon
  } = window.PrimePadelDesignSystem_093c26;
  const WEEK = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const WEEK_LONG = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const MONTHS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  const TODAY = new Date(2026, 9, 13);
  const DAYS = Array.from({
    length: 14
  }, (_, i) => {
    const d = new Date(TODAY);
    d.setDate(d.getDate() + i);
    return {
      key: d.toISOString().slice(0, 10),
      weekday: i === 0 ? 'Hoje' : WEEK[d.getDay()],
      day: d.getDate(),
      month: MONTHS[d.getMonth()],
      today: i === 0,
      date: d
    };
  });
  const COURTS = [{
    id: 'q1',
    name: 'Quadra 1',
    tags: ['Coberta', 'Panorâmica'],
    peak: 180,
    off: 150
  }, {
    id: 'q2',
    name: 'Quadra 2',
    tags: ['Coberta', 'Vidro'],
    peak: 160,
    off: 130
  }, {
    id: 'q3',
    name: 'Quadra 3',
    tags: ['Coberta', 'Vidro'],
    peak: 160,
    off: 130
  }];
  const HOURS = Array.from({
    length: 16
  }, (_, i) => 7 + i); // 07–22
  const PERIODS = {
    manha: [7, 11],
    tarde: [12, 17],
    noite: [18, 22]
  };
  const isPeak = h => h >= 18 && h <= 21;
  const rate = (court, h) => isPeak(h) ? court.peak : court.off;
  const fmt = n => 'R$ ' + n.toLocaleString('pt-BR', {
    minimumFractionDigits: 0
  });
  const hh = h => String(h).padStart(2, '0') + ':00';
  function taken(dayKey, courtId, h) {
    let s = 0;
    const str = dayKey + courtId + h;
    for (let i = 0; i < str.length; i++) s = (s * 31 + str.charCodeAt(i)) % 997;
    if (dayKey === DAYS[0].key && h < 11) return true;
    return s % 3 === 0;
  }
  function freeCount(dayKey, courtId) {
    return HOURS.filter(h => !taken(dayKey, courtId, h)).length;
  }
  function longDate(dayKey) {
    const d = DAYS.find(x => x.key === dayKey).date;
    return WEEK[d.getDay()] + ', ' + d.getDate() + ' ' + MONTHS[d.getMonth()];
  }
  const ADDONS = [{
    id: 'raquete',
    name: 'Raquete',
    price: 20,
    icon: 'shopping-bag',
    max: 4
  }, {
    id: 'bolas',
    name: 'Tubo com 3 bolas',
    price: 35,
    icon: 'circle-dot',
    max: 3
  }, {
    id: 'toalha',
    name: 'Toalha',
    price: 10,
    icon: 'shirt',
    max: 4
  }];
  function calc(b) {
    const court = COURTS.find(c => c.id === b.court);
    const base = b.hour != null ? rate(court, b.hour) * (b.duration / 60) : 0;
    const extras = ADDONS.reduce((s, a) => s + (b.addons[a.id] || 0) * a.price, 0);
    return {
      court,
      base,
      extras,
      total: base + extras
    };
  }
  function SummaryRows({
    b
  }) {
    const {
      court,
      base,
      extras,
      total
    } = calc(b);
    return /*#__PURE__*/React.createElement("div", {
      className: "bk-sum"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bk-sum__row"
    }, /*#__PURE__*/React.createElement("span", null, "Data"), /*#__PURE__*/React.createElement("span", null, longDate(b.day))), /*#__PURE__*/React.createElement("div", {
      className: "bk-sum__row"
    }, /*#__PURE__*/React.createElement("span", null, "Hor\xE1rio"), /*#__PURE__*/React.createElement("span", null, b.hour != null ? hh(b.hour) + ' · ' + b.duration + ' min' : '—')), /*#__PURE__*/React.createElement("div", {
      className: "bk-sum__row"
    }, /*#__PURE__*/React.createElement("span", null, "Quadra"), /*#__PURE__*/React.createElement("span", null, court.name)), /*#__PURE__*/React.createElement("div", {
      className: "bk-sum__row"
    }, /*#__PURE__*/React.createElement("span", null, "Quadra (", b.duration, " min)"), /*#__PURE__*/React.createElement("span", null, b.hour != null ? fmt(base) : '—')), extras ? /*#__PURE__*/React.createElement("div", {
      className: "bk-sum__row"
    }, /*#__PURE__*/React.createElement("span", null, "Extras"), /*#__PURE__*/React.createElement("span", null, fmt(extras))) : null, /*#__PURE__*/React.createElement("div", {
      className: "bk-sum__total"
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: '500 14px var(--font-sans)',
        color: 'var(--text-secondary)'
      }
    }, "Total"), /*#__PURE__*/React.createElement("b", null, b.hour != null ? fmt(total) : '—')));
  }
  Object.assign(window, {
    BK: {
      DAYS,
      COURTS,
      HOURS,
      PERIODS,
      ADDONS,
      isPeak,
      rate,
      fmt,
      hh,
      taken,
      freeCount,
      longDate,
      calc
    },
    SummaryRows
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/booking/data.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/Header.jsx
try { (() => {
(() => {
  const {
    Button,
    IconButton,
    Icon,
    Logo,
    Eyebrow,
    TimeSlot,
    Badge
  } = window.PrimePadelDesignSystem_093c26;
  const BASE = '../../';
  function LandingHeader({
    onMenu
  }) {
    const [scrolled, setScrolled] = React.useState(false);
    React.useEffect(() => {
      const on = () => setScrolled(window.scrollY > 8);
      window.addEventListener('scroll', on);
      return () => window.removeEventListener('scroll', on);
    }, []);
    return /*#__PURE__*/React.createElement("header", {
      className: 'lp-header' + (scrolled ? ' lp-header--scrolled' : '')
    }, /*#__PURE__*/React.createElement("div", {
      className: "lp-container lp-header__in"
    }, /*#__PURE__*/React.createElement("a", {
      href: "#top",
      "aria-label": "Prime Padel \u2014 in\xEDcio",
      style: {
        display: 'inline-flex'
      }
    }, /*#__PURE__*/React.createElement(Logo, {
      color: "green",
      height: 38,
      basePath: BASE
    })), /*#__PURE__*/React.createElement("nav", {
      className: "lp-nav"
    }, /*#__PURE__*/React.createElement("a", {
      href: "#quadras",
      className: "is-active"
    }, "Quadras"), /*#__PURE__*/React.createElement("a", {
      href: "#como-funciona"
    }, "Como funciona"), /*#__PURE__*/React.createElement("a", {
      href: "#planos"
    }, "Planos"), /*#__PURE__*/React.createElement("a", {
      href: "#eventos"
    }, "Eventos"), /*#__PURE__*/React.createElement("a", {
      href: "#duvidas"
    }, "D\xFAvidas")), /*#__PURE__*/React.createElement("div", {
      className: "lp-header__actions"
    }, /*#__PURE__*/React.createElement(Button, {
      as: "a",
      href: "../admin/index.html",
      variant: "ghost",
      size: "sm",
      className: "lp-only-desktop"
    }, "Entrar"), /*#__PURE__*/React.createElement(Button, {
      as: "a",
      href: "../booking/index.html",
      size: "sm"
    }, "Reservar"), /*#__PURE__*/React.createElement(IconButton, {
      className: "lp-only-mobile",
      variant: "secondary",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "menu",
        size: 20
      }),
      label: "Menu",
      onClick: onMenu
    }))));
  }
  function MobileMenu({
    onClose
  }) {
    return /*#__PURE__*/React.createElement("div", {
      className: "lp-menu"
    }, /*#__PURE__*/React.createElement("div", {
      className: "lp-menu__top"
    }, /*#__PURE__*/React.createElement(Logo, {
      color: "white",
      height: 34,
      basePath: BASE
    }), /*#__PURE__*/React.createElement(IconButton, {
      variant: "onBrand",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "x",
        size: 20
      }),
      label: "Fechar",
      onClick: onClose
    })), /*#__PURE__*/React.createElement("nav", {
      onClick: onClose
    }, /*#__PURE__*/React.createElement("a", {
      href: "#quadras"
    }, "Quadras"), /*#__PURE__*/React.createElement("a", {
      href: "#como-funciona"
    }, "Como funciona"), /*#__PURE__*/React.createElement("a", {
      href: "#planos"
    }, "Planos"), /*#__PURE__*/React.createElement("a", {
      href: "#eventos"
    }, "Eventos"), /*#__PURE__*/React.createElement("a", {
      href: "#duvidas"
    }, "D\xFAvidas")), /*#__PURE__*/React.createElement("div", {
      className: "lp-menu__foot"
    }, /*#__PURE__*/React.createElement(Button, {
      as: "a",
      href: "../booking/index.html",
      variant: "onBrand",
      size: "lg",
      block: true
    }, "Reservar quadra"), /*#__PURE__*/React.createElement(Button, {
      as: "a",
      href: "../admin/index.html",
      variant: "outlineOnBrand",
      size: "lg",
      block: true
    }, "Entrar")));
  }
  function Hero() {
    const [pick, setPick] = React.useState('19:00');
    const slots = [['18:00', 'R$ 180', true], ['19:00', 'R$ 180', true], ['20:30', 'R$ 160', false]];
    return /*#__PURE__*/React.createElement("section", {
      className: "lp-hero",
      id: "top"
    }, /*#__PURE__*/React.createElement("div", {
      className: "lp-hero__panel"
    }, /*#__PURE__*/React.createElement("span", {
      className: "lp-hero__circle"
    }), /*#__PURE__*/React.createElement("span", {
      className: "lp-hero__circle lp-hero__circle--2"
    }), /*#__PURE__*/React.createElement("div", {
      className: "lp-hero__copy"
    }, /*#__PURE__*/React.createElement(Eyebrow, {
      variant: "onBrand"
    }, "Arena de padel"), /*#__PURE__*/React.createElement("h1", {
      className: "lp-display"
    }, "Sua quadra,", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("i", null, "seu tempo.")), /*#__PURE__*/React.createElement("p", {
      className: "lp-hero__lead"
    }, "Quadras cobertas, reserva em segundos e um lugar feito para ficar depois do jogo."), /*#__PURE__*/React.createElement("div", {
      className: "lp-hero__ctas"
    }, /*#__PURE__*/React.createElement(Button, {
      as: "a",
      href: "../booking/index.html",
      variant: "onBrand",
      size: "lg",
      iconRight: /*#__PURE__*/React.createElement(Icon, {
        name: "arrow-right",
        size: 18
      })
    }, "Reservar quadra"), /*#__PURE__*/React.createElement(Button, {
      as: "a",
      href: "#planos",
      variant: "outlineOnBrand",
      size: "lg"
    }, "Ver planos"))), /*#__PURE__*/React.createElement("div", {
      className: "lp-hero__aside"
    }, /*#__PURE__*/React.createElement("div", {
      className: "lp-avail"
    }, /*#__PURE__*/React.createElement("div", {
      className: "lp-avail__top"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "lp-avail__title"
    }, "Livres hoje"), /*#__PURE__*/React.createElement("div", {
      className: "lp-avail__sub"
    }, "Qui, 15 out \xB7 Quadra 1")), /*#__PURE__*/React.createElement(Badge, {
      tone: "success",
      dot: true
    }, "Ao vivo")), /*#__PURE__*/React.createElement("div", {
      className: "lp-avail__slots"
    }, slots.map(([t, m, p]) => /*#__PURE__*/React.createElement(TimeSlot, {
      key: t,
      time: t,
      meta: m,
      peak: p,
      status: pick === t ? 'selected' : 'available',
      onClick: () => setPick(t)
    }))), /*#__PURE__*/React.createElement(Button, {
      as: "a",
      href: "../booking/index.html",
      block: true,
      iconRight: /*#__PURE__*/React.createElement(Icon, {
        name: "arrow-right",
        size: 18
      })
    }, "Reservar \xE0s ", pick))), /*#__PURE__*/React.createElement("div", {
      className: "lp-facts"
    }, [['umbrella', 'Quadras cobertas'], ['calendar-clock', 'Reserva online 24h'], ['beer', 'Bar e lounge'], ['graduation-cap', 'Aulas e clínicas']].map(([i, t]) => /*#__PURE__*/React.createElement("div", {
      key: t,
      className: "lp-fact"
    }, /*#__PURE__*/React.createElement("span", {
      className: "ic"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: i,
      size: 18
    })), t)))));
  }
  Object.assign(window, {
    LandingHeader,
    MobileMenu,
    Hero
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/Sections.jsx
try { (() => {
(() => {
  const {
    Button,
    Icon,
    Logo,
    Eyebrow,
    Card,
    CourtCard,
    Badge,
    Accordion,
    IconButton
  } = window.PrimePadelDesignSystem_093c26;
  const LP_BASE = '../../';
  function HowItWorks() {
    const steps = [['calendar-days', 'Escolha o dia e o horário', 'Veja a agenda em tempo real e toque no horário que combina com você.'], ['layout-grid', 'Selecione a quadra', 'Todas cobertas. A panorâmica tem vidro em todo o entorno.'], ['qr-code', 'Pague por Pix ou cartão', 'Confirmação imediata no seu WhatsApp, com lembrete antes do jogo.']];
    return /*#__PURE__*/React.createElement("section", {
      className: "lp-section",
      id: "como-funciona"
    }, /*#__PURE__*/React.createElement("div", {
      className: "lp-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "lp-head lp-head--center"
    }, /*#__PURE__*/React.createElement(Eyebrow, {
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "sparkles",
        size: 14
      })
    }, "Como funciona"), /*#__PURE__*/React.createElement("h2", {
      className: "lp-h1"
    }, "Reserve sua quadra ", /*#__PURE__*/React.createElement("i", null, "em tr\xEAs passos")), /*#__PURE__*/React.createElement("p", {
      className: "lp-lead"
    }, "Sem liga\xE7\xE3o, sem espera. Leva menos de um minuto.")), /*#__PURE__*/React.createElement("div", {
      className: "lp-steps"
    }, steps.map(([ic, t, d], i) => /*#__PURE__*/React.createElement("div", {
      key: t,
      className: "lp-step"
    }, /*#__PURE__*/React.createElement("span", {
      className: "lp-step__num"
    }, i + 1), /*#__PURE__*/React.createElement("span", {
      className: "lp-step__ic"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: ic,
      size: 22
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, t), /*#__PURE__*/React.createElement("p", null, d)))))));
  }
  function Courts() {
    const courts = [{
      name: 'Quadra 1',
      tags: ['Coberta', 'Panorâmica'],
      price: 'R$ 180',
      avail: '4 horários livres hoje',
      flag: /*#__PURE__*/React.createElement(Badge, {
        tone: "ball",
        size: "sm"
      }, "Mais reservada")
    }, {
      name: 'Quadra 2',
      tags: ['Coberta', 'Vidro'],
      price: 'R$ 160',
      avail: '6 horários livres hoje'
    }, {
      name: 'Quadra 3',
      tags: ['Coberta', 'Vidro'],
      price: 'R$ 160',
      avail: '2 horários livres hoje'
    }];
    return /*#__PURE__*/React.createElement("section", {
      className: "lp-section lp-section--warm",
      id: "quadras"
    }, /*#__PURE__*/React.createElement("div", {
      className: "lp-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "lp-split"
    }, /*#__PURE__*/React.createElement("div", {
      className: "lp-head"
    }, /*#__PURE__*/React.createElement(Eyebrow, {
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "layout-grid",
        size: 14
      })
    }, "Nossas quadras"), /*#__PURE__*/React.createElement("h2", {
      className: "lp-h1"
    }, "Piso, vidro e luz ", /*#__PURE__*/React.createElement("i", null, "de competi\xE7\xE3o"))), /*#__PURE__*/React.createElement(Button, {
      as: "a",
      href: "../booking/index.html",
      variant: "secondary",
      iconRight: /*#__PURE__*/React.createElement(Icon, {
        name: "arrow-right",
        size: 18
      })
    }, "Ver agenda completa")), /*#__PURE__*/React.createElement("div", {
      className: "lp-courts"
    }, courts.map(c => /*#__PURE__*/React.createElement(CourtCard, {
      key: c.name,
      name: c.name,
      tags: c.tags,
      price: c.price,
      availability: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
        name: "circle-check",
        size: 16
      }), c.avail),
      flag: c.flag,
      basePath: LP_BASE
    }, /*#__PURE__*/React.createElement(Button, {
      as: "a",
      href: "../booking/index.html",
      size: "sm"
    }, "Reservar"))))));
  }
  function Pricing() {
    const plans = [{
      name: 'Avulso',
      desc: 'Para jogar quando der vontade.',
      price: 'R$ 160',
      unit: '/ hora',
      items: ['Reserva online 24h', 'Horário nobre R$ 180 (18h–22h)', 'Cancelamento grátis até 24h antes'],
      cta: 'Reservar',
      v: 'outlined'
    }, {
      name: 'Mensalista',
      desc: 'Seu horário fixo, toda semana.',
      price: 'R$ 590',
      unit: '/ mês',
      items: ['1h por semana no mesmo horário', 'Prioridade na renovação', '10% no bar e na loja', 'Convidados pagam avulso'],
      cta: 'Quero ser mensalista',
      v: 'brand'
    }, {
      name: 'Pacote 10 horas',
      desc: 'Flexível, sem compromisso de dia.',
      price: 'R$ 1.400',
      unit: '/ pacote',
      items: ['Use em até 90 dias', 'Qualquer quadra e horário', 'Compartilhe com seu grupo'],
      cta: 'Comprar pacote',
      v: 'outlined'
    }];
    return /*#__PURE__*/React.createElement("section", {
      className: "lp-section",
      id: "planos"
    }, /*#__PURE__*/React.createElement("div", {
      className: "lp-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "lp-head lp-head--center"
    }, /*#__PURE__*/React.createElement(Eyebrow, {
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "tag",
        size: 14
      })
    }, "Planos"), /*#__PURE__*/React.createElement("h2", {
      className: "lp-h1"
    }, "Do jogo avulso ", /*#__PURE__*/React.createElement("i", null, "ao hor\xE1rio fixo")), /*#__PURE__*/React.createElement("p", {
      className: "lp-lead"
    }, "Pre\xE7o por quadra, n\xE3o por pessoa. Divida com seu quarteto.")), /*#__PURE__*/React.createElement("div", {
      className: "lp-plans"
    }, plans.map(p => /*#__PURE__*/React.createElement(Card, {
      key: p.name,
      variant: p.v,
      padding: "lg",
      className: "lp-plan"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "lp-plan__name"
    }, p.name), /*#__PURE__*/React.createElement("div", {
      className: "lp-plan__desc"
    }, p.desc)), p.v === 'brand' ? /*#__PURE__*/React.createElement(Badge, {
      tone: "ball",
      size: "sm"
    }, "Favorito") : null), /*#__PURE__*/React.createElement("div", {
      className: "lp-plan__price"
    }, p.price, /*#__PURE__*/React.createElement("small", null, p.unit)), /*#__PURE__*/React.createElement("ul", null, p.items.map(i => /*#__PURE__*/React.createElement("li", {
      key: i
    }, /*#__PURE__*/React.createElement("span", {
      className: "ic"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 18
    })), i))), /*#__PURE__*/React.createElement(Button, {
      as: "a",
      href: "../booking/index.html",
      variant: p.v === 'brand' ? 'onBrand' : 'primary',
      block: true
    }, p.cta))))));
  }
  function Events() {
    const evs = [{
      img: 'assets/brand/open-prime-padel-post.jpg',
      tag: 'Torneio',
      date: 'Inscrições encerradas',
      title: '1º Open Prime Padel',
      desc: 'Categoria open masculina. Confira os atletas confirmados.'
    }, {
      img: 'assets/brand/prime-cup-logo.jpg',
      tag: 'Torneio',
      date: 'Primavera 2026',
      title: 'Prime Cup',
      desc: 'Nosso circuito da estação, com chaves por categoria.'
    }, {
      img: 'assets/brand/day-use-post.jpg',
      tag: 'Day Use',
      date: '05 de setembro',
      title: 'Feriado com Day Use',
      desc: 'Quadras em sistema rotativo das 14h às 23h. R$ 50 por pessoa.'
    }];
    return /*#__PURE__*/React.createElement("section", {
      className: "lp-section lp-section--warm",
      id: "eventos"
    }, /*#__PURE__*/React.createElement("div", {
      className: "lp-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "lp-split"
    }, /*#__PURE__*/React.createElement("div", {
      className: "lp-head"
    }, /*#__PURE__*/React.createElement(Eyebrow, {
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "trophy",
        size: 14
      })
    }, "Eventos"), /*#__PURE__*/React.createElement("h2", {
      className: "lp-h1"
    }, "Torneios, day use ", /*#__PURE__*/React.createElement("i", null, "e encontros"))), /*#__PURE__*/React.createElement(Button, {
      as: "a",
      href: "#",
      variant: "secondary",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "instagram",
        size: 18
      })
    }, "@primepadel")), /*#__PURE__*/React.createElement("div", {
      className: "lp-events"
    }, evs.map(e => /*#__PURE__*/React.createElement("a", {
      key: e.title,
      href: "#",
      className: "lp-event"
    }, /*#__PURE__*/React.createElement("div", {
      className: "lp-event__img"
    }, /*#__PURE__*/React.createElement("img", {
      src: LP_BASE + e.img,
      alt: e.title
    })), /*#__PURE__*/React.createElement("div", {
      className: "lp-event__meta"
    }, /*#__PURE__*/React.createElement(Badge, {
      tone: "brand",
      size: "sm"
    }, e.tag), /*#__PURE__*/React.createElement("span", {
      style: {
        font: '600 11px var(--font-sans)',
        letterSpacing: '.14em',
        textTransform: 'uppercase',
        color: 'var(--text-tertiary)'
      }
    }, e.date)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, e.title), /*#__PURE__*/React.createElement("p", {
      style: {
        marginTop: 6
      }
    }, e.desc)))))));
  }
  function Faq() {
    const items = [{
      q: 'Posso cancelar ou remarcar minha reserva?',
      a: 'Sim. Até 24h antes do horário o cancelamento é grátis e o valor volta como crédito na arena. Depois disso, fale com a recepção pelo WhatsApp.'
    }, {
      q: 'O valor é por pessoa ou por quadra?',
      a: 'Por quadra. O valor da hora cobre até 4 jogadores — dá para dividir no Pix com o seu grupo.'
    }, {
      q: 'Vocês alugam raquetes e vendem bolas?',
      a: 'Sim. Raquetes por R$ 20 cada e tubos de bolas na recepção. Você pode incluir tudo já na reserva.'
    }, {
      q: 'Tem aula para iniciantes?',
      a: 'Temos aulas individuais e clínicas em grupo com professores da casa, para todos os níveis.'
    }, {
      q: 'Tem estacionamento?',
      a: 'Sim, gratuito para quem está jogando.'
    }];
    return /*#__PURE__*/React.createElement("section", {
      className: "lp-section",
      id: "duvidas"
    }, /*#__PURE__*/React.createElement("div", {
      className: "lp-container lp-faq"
    }, /*#__PURE__*/React.createElement("div", {
      className: "lp-head",
      style: {
        marginBottom: 0
      }
    }, /*#__PURE__*/React.createElement(Eyebrow, {
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "message-circle",
        size: 14
      })
    }, "D\xFAvidas"), /*#__PURE__*/React.createElement("h2", {
      className: "lp-h1"
    }, "Perguntas ", /*#__PURE__*/React.createElement("i", null, "frequentes")), /*#__PURE__*/React.createElement("p", {
      className: "lp-lead"
    }, "N\xE3o achou o que procurava? A gente responde r\xE1pido no WhatsApp."), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "message-circle",
        size: 18
      })
    }, "Falar no WhatsApp")), /*#__PURE__*/React.createElement(Accordion, {
      items: items
    })));
  }
  function CtaBand() {
    return /*#__PURE__*/React.createElement("section", {
      className: "lp-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "lp-cta"
    }, /*#__PURE__*/React.createElement("span", {
      className: "lp-hero__circle"
    }), /*#__PURE__*/React.createElement("h2", null, "Seu pr\xF3ximo jogo ", /*#__PURE__*/React.createElement("i", null, "come\xE7a aqui.")), /*#__PURE__*/React.createElement("p", null, "Escolha o hor\xE1rio agora e receba a confirma\xE7\xE3o no WhatsApp."), /*#__PURE__*/React.createElement("div", {
      className: "lp-hero__ctas"
    }, /*#__PURE__*/React.createElement(Button, {
      as: "a",
      href: "../booking/index.html",
      variant: "onBrand",
      size: "lg",
      iconRight: /*#__PURE__*/React.createElement(Icon, {
        name: "arrow-right",
        size: 18
      })
    }, "Reservar quadra"))));
  }
  function Footer() {
    return /*#__PURE__*/React.createElement("footer", {
      className: "lp-footer"
    }, /*#__PURE__*/React.createElement("div", {
      className: "lp-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "lp-footer__grid"
    }, /*#__PURE__*/React.createElement("div", {
      className: "lp-footer__about"
    }, /*#__PURE__*/React.createElement(Logo, {
      color: "white",
      height: 48,
      basePath: LP_BASE
    }), /*#__PURE__*/React.createElement("p", null, "Arena de padel com quadras cobertas, bar e lounge. Aberto todos os dias."), /*#__PURE__*/React.createElement("div", {
      className: "lp-footer__social"
    }, /*#__PURE__*/React.createElement(IconButton, {
      variant: "onBrand",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "instagram",
        size: 18
      }),
      label: "Instagram"
    }), /*#__PURE__*/React.createElement(IconButton, {
      variant: "onBrand",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "message-circle",
        size: 18
      }),
      label: "WhatsApp"
    }), /*#__PURE__*/React.createElement(IconButton, {
      variant: "onBrand",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "map-pin",
        size: 18
      }),
      label: "Como chegar"
    }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, "Arena"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
      href: "#quadras"
    }, "Quadras")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
      href: "#planos"
    }, "Planos")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
      href: "#eventos"
    }, "Eventos")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Aulas")))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, "Reservas"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
      href: "../booking/index.html"
    }, "Reservar quadra")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Minhas reservas")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
      href: "#duvidas"
    }, "Pol\xEDtica de cancelamento")))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, "Hor\xE1rio"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Seg a sex \xB7 6h \xE0s 23h")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "S\xE1b e dom \xB7 7h \xE0s 22h"))))), /*#__PURE__*/React.createElement("div", {
      className: "lp-footer__bottom"
    }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Prime Padel"), /*#__PURE__*/React.createElement("span", null, "Termos \xB7 Privacidade"))));
  }
  Object.assign(window, {
    HowItWorks,
    Courts,
    Pricing,
    Events,
    Faq,
    CtaBand,
    Footer
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/Sections.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.CourtCard = __ds_scope.CourtCard;

__ds_ns.DateStrip = __ds_scope.DateStrip;

__ds_ns.TimeSlot = __ds_scope.TimeSlot;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.StatCard = __ds_scope.StatCard;

__ds_ns.Table = __ds_scope.Table;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.SegmentedControl = __ds_scope.SegmentedControl;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Accordion = __ds_scope.Accordion;

__ds_ns.ProgressSteps = __ds_scope.ProgressSteps;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
