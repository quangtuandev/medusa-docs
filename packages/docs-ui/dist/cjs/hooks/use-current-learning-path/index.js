"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCurrentLearningPath = void 0;
const react_1 = __importStar(require("react"));
const providers_1 = require("../../providers");
const Icon_1 = require("../../components/LearningPath/Icon");
const Finish_1 = require("../../components/LearningPath/Finish");
const Steps_1 = require("../../components/LearningPath/Steps");
const useCurrentLearningPath = () => {
    const { path, currentStep, updatePath, endPath } = (0, providers_1.useLearningPath)();
    const step = path?.steps[currentStep];
    const { addNotification, generateId, removeNotification, updateNotification, } = (0, providers_1.useNotifications)() || {};
    // used when a notification closed (finished or not)
    const handleClose = (notificationId, shouldEndPath = true) => {
        if (shouldEndPath) {
            setTimeout(() => {
                endPath();
            }, 500);
        }
        removeNotification?.(notificationId);
    };
    // used when the learning path is completely finished
    // shows the finish step, if the path has any
    const handleFinish = (notificationId) => {
        if (path?.finish) {
            updateNotification?.(notificationId, {
                title: path.finish.step.title,
                text: path.finish.step.description,
                type: "custom",
                layout: "default",
                CustomIcon: (react_1.default.createElement(Icon_1.LearningPathIcon, { className: "!w-2 !h-2", imgClassName: "!w-1.5 !h-1.5" })),
                children: (react_1.default.createElement(Finish_1.LearningPathFinish, { ...path.finish, onRating: () => setTimeout(() => {
                        handleClose(notificationId, false);
                    }, 1500) })),
            });
            endPath();
        }
        else {
            handleClose(notificationId);
        }
    };
    const LearningStep = (notificationId) => {
        return react_1.default.createElement(Steps_1.LearningPathSteps, { onFinish: () => handleFinish(notificationId) });
    };
    // create a notification when a path is initialized
    (0, react_1.useEffect)(() => {
        if (path && !path.notificationId) {
            const id = generateId?.();
            if (!id) {
                return;
            }
            addNotification?.({
                title: path.label,
                text: step?.description,
                onClose: () => handleClose(id),
                layout: "empty",
                id,
                children: LearningStep(id),
                className: "flex flex-col",
            });
            updatePath({
                notificationId: id,
            });
        }
    }, [path]);
    // update an existing notification when the step changes
    (0, react_1.useEffect)(() => {
        if (path && path.notificationId && step) {
            updateNotification?.(path.notificationId, {
                text: step?.description,
                children: LearningStep(path.notificationId),
            });
        }
    }, [step]);
};
exports.useCurrentLearningPath = useCurrentLearningPath;
