import { Tab, Tabs } from '@heroui/react'
import {
    CogIcon,
    InfoIcon,
    KeyboardIcon,
    SatelliteDishIcon,
} from 'lucide-react'
import { useMemo } from 'react'
import GeneralSection from './GeneralSection'
import ProxySection from './ProxySection'
import ToolbarSection from './ToolbarSection'
import TroubleshootSection from './TroubleshootSection'

export default function PreferencesSection() {
    return (
        <div className="flex flex-col w-full h-full gap-4">
            <Tabs
                aria-label="Preferences"
                isVertical={false}
                variant="underlined"
                destroyInactiveTabPanel={false}
                disableAnimation={true}
                classNames={{
                    tabList: 'gap-6 w-full relative rounded-none p-0 border-b border-divider',
                    cursor: 'w-full bg-primary',
                    tab: 'max-w-fit px-0 h-12',
                    tabContent: 'group-data-[selected=true]:text-primary'
                }}
                color="primary"
            >
                <Tab
                    key="general"
                    title={
                        <div className="flex items-center gap-2">
                            <CogIcon className="w-4 h-4" />
                            <span>General</span>
                        </div>
                    }
                >
                    <GeneralSection />
                </Tab>
                <Tab
                    key="toolbar"
                    title={
                        <div className="flex items-center gap-2">
                            <KeyboardIcon className="w-4 h-4" />
                            <span>Toolbar</span>
                        </div>
                    }
                >
                    <ToolbarSection />
                </Tab>
                <Tab
                    key="proxy"
                    title={
                        <div className="flex items-center gap-2">
                            <SatelliteDishIcon className="w-4 h-4" />
                            <span>Proxy</span>
                        </div>
                    }
                >
                    <ProxySection />
                </Tab>
                <Tab
                    key="troubleshoot"
                    title={
                        <div className="flex items-center gap-2">
                            <InfoIcon className="w-4 h-4" />
                            <span>Troubleshoot</span>
                        </div>
                    }
                >
                    <TroubleshootSection />
                </Tab>
            </Tabs>
        </div>
    )
}
