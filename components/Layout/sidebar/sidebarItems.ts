import { BorderAllIcon } from 'vue-tabler-icons';
import { 
  IconCards
  , IconPackages
  , IconShoppingBag
  , IconHeart
  , IconUsersGroup 
} from '@tabler/icons-vue';

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
  { header: 'GESTOR USUARIO' },
  {
    title: "Usuarios (check-in)",
    icon: IconCards,
    to: "/gestoringreso",
  },

  { header: 'GESTOR INVENTARIO' },
  {
    title: "Rack",
    icon: BorderAllIcon,
    to: "/gestorrack",
  },
  {
    title: "Inventarios",
    icon: IconPackages,
    to: "/gestorinventario",
  },
  {
    title: "Producto item * aca poner producto  e item",
    icon: IconPackages,
    to: "",
  },
  { header: 'GESTOR PROYECTO' },
  {
    title: "Proyectos",
    icon: IconUsersGroup,
    to: "/gestorproyecto",
  },
  { header: 'LISTA DE DESEOS' },
  {
    title: "Wish-list",
    icon: IconHeart,
    to: "/wishlist",
  },
  {
    title: "Gestor de productos",
    icon: IconShoppingBag,
    to: "/productos",
  },
];

export default sidebarItem;