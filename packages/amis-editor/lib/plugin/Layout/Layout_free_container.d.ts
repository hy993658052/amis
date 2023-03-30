import { ContainerPlugin } from '../Container';
export default class Layout_free_container extends ContainerPlugin {
    name: string;
    isBaseComponent: boolean;
    pluginIcon: string;
    description: string;
    order: number;
    tags: string[];
    scaffold: any;
    panelTitle: string;
}
