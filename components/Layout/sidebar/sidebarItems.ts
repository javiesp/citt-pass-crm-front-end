import {
  BorderAllIcon,
  AlertCircleIcon,
  CircleDotIcon,
  BoxMultiple1Icon,
  AdjustmentsHorizontalIcon,
  LayoutDashboardIcon

} from 'vue-tabler-icons';
import { IconCards, IconTable  } from '@tabler/icons-vue';

export interface menu {
  header?: string;
  title?: string;
  icon?: any;
  to?: string;
  chip?: string;
  chipBgColor?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
}

const sidebarItem: menu[] = [
  { header: 'GESTOR' },
  {
    title: "Gestor ingresos",
    icon: IconCards,
    to: "/",
  },
  { header: 'INVENTARIO' },
  {
    title: "Alert",
    icon: AlertCircleIcon,
    to: "/ui-components/alerts",
  },
  {
    title: "Button",
    icon: CircleDotIcon,
    to: "/ui-components/buttons",
  },
  {
    title: "Cards",
    icon: BoxMultiple1Icon,
    to: "/ui-components/cards",
  },
  {
    title: "Curousel",
    icon: AdjustmentsHorizontalIcon,
    to: "/ui-components/curousel",
  },
  {
    title: "Tables",
    icon: BorderAllIcon,
    to: "/ui-components/tabels",
  },

 

];

export default sidebarItem;
