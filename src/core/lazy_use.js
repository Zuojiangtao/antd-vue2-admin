import Vue from 'vue'

// ant design 基础组件
import {
  ConfigProvider,
  Layout,
  Input,
  InputNumber,
  Button,
  Switch,
  Radio,
  Checkbox,
  Select,
  Card,
  Form,
  Row,
  Col,
  Modal,
  Table,
  Tabs,
  Icon,
  Badge,
  Popover,
  Dropdown,
  List,
  Avatar,
  Breadcrumb,
  Steps,
  Spin,
  Menu,
  Drawer,
  Tooltip,
  Tree,
  Alert,
  Tag,
  Divider,
  DatePicker,
  TimePicker,
  Upload,
  Progress,
  Skeleton,
  Popconfirm,
  Pagination,
  PageHeader,
  Result,
  Statistic,
  Descriptions,
  Cascader,
  message,
  notification,
  Space,
  Transfer,
  TreeSelect,
  Empty,
} from 'ant-design-vue'

// 外部插件组件
// import VueClipboard from 'vue-clipboard2'
// import 'viewerjs/dist/viewer.css'
// import VueViewer from 'v-viewer' // 图片预览

// 业务组件
// import TableQuerySearch from '@/components/Table/TableQuerySearch'
// import FormDrawer from '@/components/FormDrawer/FormDrawer'
// import GoBackCrumb from '@/components/GoBackCrumb/GoBackCrumb'
// import InfoItem from '@/components/InfoList/InfoItem'
// import InfoList from '@/components/InfoList/InfoList'
// import CheckboxButton from '@/components/CheckboxButton/CheckboxButton'
// import TextOverflowTooltip from '@/components/TextOverflowTooltip/TextOverflowTooltip'
// import StatusBadge from '@/components/Table/StatusBadge'

Vue.use(ConfigProvider)
Vue.use(Layout)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Button)
Vue.use(Switch)
Vue.use(Radio)
Vue.use(Checkbox)
Vue.use(Select)
Vue.use(Card)
Vue.use(Form)
Vue.use(Row)
Vue.use(Col)
Vue.use(Modal)
Vue.use(Table)
Vue.use(Tabs)
Vue.use(Icon)
Vue.use(Badge)
Vue.use(Popover)
Vue.use(Dropdown)
Vue.use(List)
Vue.use(Avatar)
Vue.use(Breadcrumb)
Vue.use(Steps)
Vue.use(Spin)
Vue.use(Menu)
Vue.use(Drawer)
Vue.use(Tooltip)
Vue.use(Tree)
Vue.use(Alert)
Vue.use(Tag)
Vue.use(Divider)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(Upload)
Vue.use(Progress)
Vue.use(Skeleton)
Vue.use(Popconfirm)
Vue.use(Pagination)
Vue.use(PageHeader)
Vue.use(Result)
Vue.use(Statistic)
Vue.use(Descriptions)
Vue.use(Cascader)
Vue.use(Space)
Vue.use(Transfer)
Vue.use(TreeSelect)
Vue.use(Empty)

Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$message = message
Vue.prototype.$notification = notification
Vue.prototype.$info = Modal.info
Vue.prototype.$success = Modal.success
Vue.prototype.$error = Modal.error
Vue.prototype.$warning = Modal.warning

// VueClipboard.config.autoSetContainer = true
// Vue.use(VueClipboard)

// Vue.use(VueViewer)

// Vue.component('table-query-search', TableQuerySearch)
// Vue.component('form-drawer', FormDrawer)
// Vue.component('go-back-crumb', GoBackCrumb)
// Vue.component('info-item', InfoItem)
// Vue.component('info-list', InfoList)
// Vue.component('a-checkbox-button', CheckboxButton)
// Vue.component('text-overflow-tooltip', TextOverflowTooltip)
// Vue.component('status-badge', StatusBadge)

process.env.NODE_ENV !== 'production' && console.warn('[antd-pro] NOTICE: Antd use lazy-load.')
