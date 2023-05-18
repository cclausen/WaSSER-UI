export * from './achievementController.service';
import { AchievementControllerService } from './achievementController.service';
export * from './personController.service';
import { PersonControllerService } from './personController.service';
export * from './presenceController.service';
import { PresenceControllerService } from './presenceController.service';
export * from './summaryController.service';
import { SummaryControllerService } from './summaryController.service';
export const APIS = [AchievementControllerService, PersonControllerService, PresenceControllerService, SummaryControllerService];
