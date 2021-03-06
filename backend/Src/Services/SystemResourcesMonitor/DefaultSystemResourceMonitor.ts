import { Broadcaster } from '@/ClientIO';
import { Logger } from '@/Common/Logger';
import { GetFolderSize } from '@/Common/Util';
import { SystemInfo } from '@Shared/Types';
import { SystemResourcesMonitor } from './SystemResourcesMonitor';

export class DefaultSystemResourceMonitor implements SystemResourcesMonitor {
    private timer: NodeJS.Timeout | null = null;
    private info: SystemInfo = { cpu: 0, rss: 0, hdd: 0 };

    constructor(private broadcaster: Broadcaster, private path: string, private updatePeriod: number) { }

    public get Info(): SystemInfo {
        return this.info;
    }

    public Start() {
        this.Tick();
    }

    private ScheduleNext() {
        this.timer = setTimeout(() => this.Tick(), this.updatePeriod);
    }

    private async Tick() {
        try {
            this.info.hdd = await GetFolderSize(this.path);
        } catch (e) {
            Logger.Get.Log('FIXME: Deleting archive record while GetFolderSize execution.');
        }

        this.broadcaster.SystemMonitorUpdate(this.info);
        this.ScheduleNext();
    }
}
