import { FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageShell from "../components/PageShell";
import GlowCard from "../components/GlowCard";
import { apiUrl } from "../lib/api";

type JobStatus = "uploaded" | "processing" | "done" | "error";
type EmailStatus = "pending" | "sent" | "error" | null;

type Job = {
  id: string;
  filename: string;
  originalname?: string | null;
  status: JobStatus;
  createdAt: string;
  updatedAt?: string;
  resultSummary?: string | null;
  analysisJson?: string | null;
  error?: string | null;
  emailStatus?: EmailStatus;
  emailSentAt?: string | null;
};

type ParsedAnalysis = {
  CLIENT_NAME?: string;
  CLIENT_INDUSTRY?: string;
  CLIENT_OVERVIEW?: string;
  TIME_EFFICIENCY?: string;
  COSTS_RESOURCES?: string;
  RISK_QUALITY?: string;
  REVENUE_GROWTH?: string;
  CUSTOMER_ENGAGEMENT?: string;
  DATA_SYSTEMS?: string;
  TOP_PRIORITY?: string | string[];
  READINESS_CONSTRAINTS?: string;
  COMPETITION_CAPACITY?: string;
  KEY_OUTCOMES?: string;
  AUTOMATIONS_LIST?: string | string[];
  REVENUE_IDEAS?: string | string[];
  METRICS?: string | string[];
  RED_FLAGS?: string | string[];
  NEXT_STEPS?: string | string[];
  KEY_QUOTES?: string | string[];
  PLAN_LIST?: string | string[];
  callSummary?: string;
  topPriorities?: string | string[];
  painPoints?: string | string[];
  timelineUrgency?: string;
  fullReport?: string;
};

type PrecallQuestion = {
  id: string;
  category: string;
  question: string;
  importance: "must-ask" | "nice-to-have";
  source: "core" | "goal-specific";
  checked?: boolean;
};

type CriticalTopic = {
  title: string;
  whyItMatters: string;
  questionsToCover: string[];
};

type PrecallResult = {
  briefing: {
    clientOverview: string;
    companyOverview: string;
    meetingFocus: string;
  };
  questionChecklist: PrecallQuestion[];
  emailStatus?: "sent" | "error" | "skipped";
  coachingNotes: string[];
  metadata: {
    version: number;
    callType: string;
  };
  meetingSuccess?: string;
  criticalTopics?: CriticalTopic[];
};

type PrecallForm = {
  clientName: string;
  companyName: string;
  role: string;
  websiteUrl: string;
  linkedinUrl: string;
  sendToEmail: string;
  notes: string;
  meetingGoal: string;
  goalDescription: string;
  offerName: string;
  offerSummary: string;
  desiredOutcome: string;
};

type PrecallPlanSummary = {
  id: string;
  createdAt: string;
  clientName: string | null;
  companyName: string | null;
  meetingGoal: string | null;
  offerName: string | null;
  desiredOutcome: string | null;
};

type PrecallPlanDetail = {
  id: string;
  createdAt: string;
  clientName: string | null;
  companyName: string | null;
  meetingGoal: string | null;
  offerName: string | null;
  desiredOutcome: string | null;
  briefing: PrecallResult["briefing"];
  checklist: PrecallQuestion[];
  coaching: string[] | null;
};

type PostCallCoaching = {
  goalSummary: string;
  goalAchieved: boolean;
  goalComment: string;
  strengths: string[];
  improvementAreas: string[];
  missedQuestions: string[];
  coachingTips: string[];
  followUpsForClient: string[];
  primaryNextAction: string;
  nextActionSteps: string[];
  riskLevel?: "low" | "medium" | "high";
  opportunitySize?: "small" | "medium" | "large";
};

type AiCoverageQuestion = {
  id: string;
  question: string;
  status: "asked" | "partially_asked" | "not_asked";
  confidence?: number;
  rationale?: string;
};

type UserSettings = {
  autoPrecallEmail: boolean;
  autoPostcallCoachingEmail: boolean;
  theme: "dark" | "light";
};

type StatusMessage =
  | "Idle - waiting for a recording."
  | "Uploading file - please wait..."
  | "File uploaded successfully. Analysis has started..."
  | "There was a problem starting the analysis. Please try again."
  | 'Analysis complete. Call summary is ready - click "View details" in Recent Calls.'
  | string;

type EmailStatusHint = {
  text: string;
  className: string;
};

type HelpTooltipProps = {
  text: string;
};

function HelpTooltip({ text }: HelpTooltipProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        tabIndex={0}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((previous) => !previous)}
        className="flex h-5 w-5 items-center justify-center rounded-full border border-slate-500 text-[11px] font-semibold text-slate-200 hover:border-[#06B6D4] hover:text-[#06B6D4]"
        aria-label="Field help"
      >
        ?
      </button>
      {open && (
        <div className="absolute right-0 z-10 mt-2 w-56 rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-[11px] text-slate-100 shadow-lg">
          {text}
        </div>
      )}
    </div>
  );
}

function formatDateTime(value?: string | null) {
  if (!value) {
    return "Unknown date";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Unknown date";
  }

  return date.toLocaleString();
}

function formatShortDate(value?: string | null) {
  if (!value) {
    return "Unknown date";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Unknown date";
  }

  return date.toLocaleDateString();
}

function getBadgeClasses(status: JobStatus) {
  const base =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide";

  switch (status) {
    case "processing":
      return `${base} bg-amber-500/20 text-amber-300 border border-amber-400/40`;
    case "done":
      return `${base} bg-emerald-500/20 text-emerald-300 border border-emerald-400/40`;
    case "error":
      return `${base} bg-red-500/20 text-red-300 border border-red-400/40`;
    default:
      return `${base} bg-slate-500/20 text-slate-300 border border-slate-400/40`;
  }
}

function getSourceBadgeClasses(source: PrecallQuestion["source"]) {
  const base = "rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wide";
  if (source === "goal-specific") {
    return `${base} bg-cyan-500/20 text-cyan-200 border-cyan-400/40`;
  }
  return `${base} bg-slate-800 text-slate-300 border-slate-700/80`;
}

function getImportanceBadgeClasses(importance: PrecallQuestion["importance"]) {
  const base = "rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wide";
  if (importance === "must-ask") {
    return `${base} bg-amber-500/25 text-amber-200 border-amber-400/50`;
  }
  return `${base} bg-blue-500/15 text-blue-200 border-blue-400/40`;
}

function getEmailStatusHint(job: Job | null): EmailStatusHint | null {
  if (!job) {
    return null;
  }

  if (job.emailStatus === "sent") {
    return {
      text: "Email sent",
      className: "text-[10px] font-semibold text-emerald-300",
    };
  }

  if (job.emailStatus === "error") {
    return {
      text: "Email error",
      className: "text-[10px] font-semibold text-red-300",
    };
  }

  if ((job.emailStatus == null || job.emailStatus === "pending") && job.status === "done") {
    return {
      text: "Email pending",
      className: "text-[10px] font-semibold text-amber-300",
    };
  }

  return null;
}

function parseAnalysisJson(raw?: string | null): ParsedAnalysis | null {
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as ParsedAnalysis;
    return data;
  } catch (error) {
    console.error("Failed to parse analysisJson", error);
    return null;
  }
}

function renderListOrText(value?: string | string[]) {
  if (!value) return "Not available yet.";
  if (Array.isArray(value)) {
    return (
      <ul className="mt-1 list-disc space-y-1 pl-4">
        {value.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
  }
  return value;
}

export default function Discovery() {
  const navigate = useNavigate();
  const idleTimeoutRef = useRef<number | null>(null);

  const [activeTab, setActiveTab] =
    useState<"precall" | "calls" | "postcall" | "settings">("precall");

  const [file, setFile] = useState<File | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobsError, setJobsError] = useState<string | null>(null);
  const [isLoadingJobs, setIsLoadingJobs] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<StatusMessage>("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showPreviousCalls, setShowPreviousCalls] = useState(false);
  const [hasCompletedJob, setHasCompletedJob] = useState(false);
  const [latestUploadedJobId, setLatestUploadedJobId] = useState<string | null>(null);

  const [precallForm, setPrecallForm] = useState<PrecallForm>({
    clientName: "",
    companyName: "",
    role: "",
    websiteUrl: "",
    linkedinUrl: "",
    sendToEmail: "",
    notes: "",
    meetingGoal: "sell_service",
    goalDescription: "",
    offerName: "",
    offerSummary: "",
    desiredOutcome: "",
  });

  const [precallResult, setPrecallResult] = useState<PrecallResult | null>(null);
  const [precallLoading, setPrecallLoading] = useState(false);
  const [precallError, setPrecallError] = useState<string | null>(null);
  const [precallSavedMessage, setPrecallSavedMessage] = useState<string | null>(null);
  const [checklistReadyMessage, setChecklistReadyMessage] = useState<string | null>(null);
  const [showBriefing, setShowBriefing] = useState(false);
  const [showCoaching, setShowCoaching] = useState(false);
  const [isLiveChecklistOpen, setIsLiveChecklistOpen] = useState(false);
  const [isPrecallChecklistOpen, setIsPrecallChecklistOpen] = useState(true);
  const [recentPrecallPlans, setRecentPrecallPlans] = useState<PrecallPlanSummary[]>([]);
  const [recentPrecallPlansError, setRecentPrecallPlansError] = useState<string | null>(null);
  const [recentPrecallPlansLoading, setRecentPrecallPlansLoading] = useState(false);
  const hasLoadedRecentPrecallPlansRef = useRef(false);
  const [isRecentPlansCollapsed, setIsRecentPlansCollapsed] = useState(false);
  const [postcallCoaching, setPostcallCoaching] = useState<PostCallCoaching | null>(null);
  const [isPostcallLoading, setIsPostcallLoading] = useState(false);
  const [postcallError, setPostcallError] = useState<string | null>(null);
  const [isPostcallCoachingOpen, setIsPostcallCoachingOpen] = useState(true);
  const [selectedPrecallPlanIdForCoaching, setSelectedPrecallPlanIdForCoaching] = useState<string | null>(null);
  const [aiCoverage, setAiCoverage] = useState<AiCoverageQuestion[] | null>(null);
  const [aiCoverageLoading, setAiCoverageLoading] = useState(false);
  const [aiCoverageError, setAiCoverageError] = useState<string | null>(null);
  const [settings, setSettings] = useState<UserSettings>({
    autoPrecallEmail: true,
    autoPostcallCoachingEmail: false,
    theme: "dark",
  });
  const isLightTheme = settings.theme === "light";
  const [isSettingsLoading, setIsSettingsLoading] = useState(false);
  const [settingsError, setSettingsError] = useState<string | null>(null);
  const [settingsSavedMessage, setSettingsSavedMessage] = useState<string | null>(null);

  const fetchRecentPrecallPlans = async (force = false) => {
    setRecentPrecallPlansLoading(true);
    setRecentPrecallPlansError(null);
    try {
      if (!force && hasLoadedRecentPrecallPlansRef.current) {
        setRecentPrecallPlansLoading(false);
        return;
      }

      const response = await fetch(apiUrl("/precall-plans"));
      if (!response.ok) {
        console.error("Failed to load precall plans", response.status, response.statusText);
        setRecentPrecallPlans([]);
        return;
      }

      let data: unknown;
      try {
        data = await response.json();
      } catch (parseError) {
        console.error("Failed to parse precall plans response", parseError);
        setRecentPrecallPlans([]);
        return;
      }

      let plans: PrecallPlanSummary[] = [];
      if (Array.isArray(data)) {
        plans = data as PrecallPlanSummary[];
      } else if (Array.isArray((data as { plans?: PrecallPlanSummary[] }).plans)) {
        plans = (data as { plans?: PrecallPlanSummary[] }).plans ?? [];
      } else {
        console.error("Unexpected precall plans shape", data);
        plans = [];
      }

      setRecentPrecallPlans(plans);
      hasLoadedRecentPrecallPlansRef.current = true;
    } catch (error) {
      console.error("Failed to load recent precall plans", error);
      setRecentPrecallPlansError("Could not load recent pre-call plans.");
    } finally {
      setRecentPrecallPlansLoading(false);
    }
  };

  useEffect(() => {
    setFile((previous) => (previous ? null : previous));
    setStatusMessage("");
  }, []);

  useEffect(() => {
    if (activeTab !== "precall") {
      return;
    }

    void fetchRecentPrecallPlans(false);
  }, [activeTab]);

  useEffect(() => {
    if (activeTab !== "settings") return;
    let cancelled = false;
    const loadSettings = async () => {
      setIsSettingsLoading(true);
      setSettingsError(null);
      setSettingsSavedMessage(null);
      try {
        const response = await fetch(apiUrl("/settings"));
        if (!response.ok) {
          throw new Error("Failed to load settings");
        }
        const data = await response.json();
        if (cancelled) return;
        setSettings({
          autoPrecallEmail: Boolean(data.autoPrecallEmail),
          autoPostcallCoachingEmail: Boolean(data.autoPostcallCoachingEmail),
          theme: data.theme === "light" ? "light" : "dark",
        });
      } catch (error) {
        console.error("Error loading settings", error);
        if (!cancelled) {
          setSettingsError("Could not load settings. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setIsSettingsLoading(false);
        }
      }
    };
    void loadSettings();
    return () => {
      cancelled = true;
    };
  }, [activeTab]);

  const fetchJobs = async () => {
    setIsLoadingJobs(true);
    setJobsError(null);
    try {
      const response = await fetch(apiUrl("/jobs"));
      if (!response.ok) {
        console.error("Failed to load jobs", response.status, response.statusText);
        setJobs([]);
        setJobsError("Failed to load calls");
        return;
      }

      let data: unknown;
      try {
        data = await response.json();
      } catch (parseError) {
        console.error("Failed to parse jobs response", parseError);
        setJobs([]);
        setJobsError("Failed to load calls");
        return;
      }

      let jobsData: Job[] = [];
      if (Array.isArray(data)) {
        jobsData = data as Job[];
      } else if (Array.isArray((data as { jobs?: Job[] }).jobs)) {
        jobsData = (data as { jobs?: Job[] }).jobs ?? [];
      } else {
        console.error("Unexpected jobs shape", data);
        jobsData = [];
      }

      const sorted = [...jobsData].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      setJobs(sorted);

      if (selectedJob) {
        const updated = sorted.find((job) => job.id === selectedJob.id) ?? null;
        setSelectedJob(updated);
      }

      if (!selectedJob && sorted.length > 0) {
        setSelectedJob(sorted[0]);
      }

      if (sorted.length > 0 && sorted[0].status === "done") {
        setStatusMessage(
          'Analysis complete. Call summary is ready - click "View details" in Recent Calls.',
        );
      }

      if (latestUploadedJobId) {
        const trackedJob = sorted.find((job) => job.id === latestUploadedJobId);
        if (trackedJob?.status === "done") {
          setStatusMessage(
            'Analysis complete. Call summary is ready - click "View details" in Recent Calls.',
          );
          setHasCompletedJob(true);
          setLatestUploadedJobId(null);
        } else if (!trackedJob) {
          setLatestUploadedJobId(null);
        }
      }
    } catch (error) {
      console.error("Failed to load jobs", error);
      setJobs([]);
      setJobsError("Failed to load calls");
    } finally {
      setIsLoadingJobs(false);
    }
  };

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep checking the backend while any job is still in progress
  useEffect(() => {
    if (jobs.length === 0) return;

    const hasActiveJob = jobs.some(
      (job) => job.status === "processing" || job.status === "uploaded",
    );

    if (!hasActiveJob) {
      return;
    }

    const intervalId = window.setInterval(() => {
      fetchJobs();
    }, 5000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [jobs]);

  useEffect(() => {
    setAiCoverage(null);
    setAiCoverageError(null);
  }, [selectedJob?.id, selectedPrecallPlanIdForCoaching]);

  useEffect(() => {
    if (!hasCompletedJob) {
      if (idleTimeoutRef.current) {
        window.clearTimeout(idleTimeoutRef.current);
        idleTimeoutRef.current = null;
      }
      return;
    }

    const resetTimer = () => {
      if (idleTimeoutRef.current) {
        window.clearTimeout(idleTimeoutRef.current);
      }
      idleTimeoutRef.current = window.setTimeout(() => {
        navigate("/");
      }, 180000);
    };

    const events: Array<keyof WindowEventMap> = [
      "mousemove",
      "keydown",
      "click",
      "touchstart",
    ];

    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      if (idleTimeoutRef.current) {
        window.clearTimeout(idleTimeoutRef.current);
      }
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [hasCompletedJob, navigate]);

  const latestJob = jobs.length > 0 ? jobs[0] : null;
  const previousJobs = jobs.length > 1 ? jobs.slice(1) : [];
  const latestEmailStatusHint = getEmailStatusHint(latestJob);

  const updatePrecallField = (field: keyof PrecallForm, value: string) => {
    setPrecallForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleUpload = async () => {
    if (!file) {
      setStatusMessage("There was a problem starting the analysis. Please try again.");
      return;
    }

    setIsUploading(true);
    setStatusMessage("Uploading file - please wait...");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(apiUrl("/process-file"), {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      let jobIdFromResponse: string | null = null;
      try {
        const data = (await response.json()) as { jobId?: string };
        jobIdFromResponse =
          data && typeof data.jobId === "string" ? data.jobId : null;
      } catch {
        jobIdFromResponse = null;
      }

      setFile(null);
      setLatestUploadedJobId(jobIdFromResponse);
      setStatusMessage("File uploaded successfully. Analysis has started...");
      await fetchJobs();
    } catch (error) {
      console.error(error);
      setStatusMessage("There was a problem starting the analysis. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    if (!window.confirm("Delete this call and all its analysis/coaching?")) {
      return;
    }

    const jobIdString = jobId;
    try {
      const response = await fetch(apiUrl(`/jobs/${jobIdString}`), {
        method: "DELETE",
      });

      if (!response.ok) {
        console.error("Failed to delete job", await response.text());
        setStatusMessage("Error deleting call. Please try again.");
        return;
      }

      setJobs((previous) => previous.filter((job) => job.id !== jobIdString));
      if (selectedJob?.id === jobIdString) {
        setSelectedJob(null);
        setPostcallCoaching(null);
        setPostcallError(null);
      }
      if (latestUploadedJobId === jobIdString) {
        setLatestUploadedJobId(null);
      }

      setStatusMessage("Call deleted.");
    } catch (error) {
      console.error(error);
      setStatusMessage("Error deleting call. Please try again.");
    }
  };

  const handlePrecallSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPrecallError(null);
    setPrecallSavedMessage(null);
    setChecklistReadyMessage(null);
    setPrecallLoading(true);

    try {
      const payload = {
        ...precallForm,
        sendToEmail: precallForm.sendToEmail.trim(),
      };

      const response = await fetch(apiUrl("/precall-prep"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to generate pre-call prep");
      }

      const data = (await response.json()) as PrecallResult;

        const normalized: PrecallResult = {
          ...data,
          meetingSuccess:
            typeof data.meetingSuccess === "string" ? data.meetingSuccess : "",
          criticalTopics: Array.isArray(data.criticalTopics) ? data.criticalTopics : [],
          emailStatus: data.emailStatus,
          questionChecklist: (data.questionChecklist ?? []).map((question) => ({
            ...question,
            checked: false,
          })),
        };

      setPrecallResult(normalized);
      setIsPrecallChecklistOpen(true);
      setPrecallSavedMessage("Pre-call plan saved.");

      try {
        await fetchRecentPrecallPlans(true);
      } catch (refreshError) {
        console.error(
          "Failed to refresh recent precall plans after submit",
          refreshError,
        );
      }
    } catch (error) {
      console.error(error);
      setPrecallError("Could not generate pre-call prep. Please try again.");
      setPrecallSavedMessage(null);
    } finally {
      setPrecallLoading(false);
    }
  };

  const handleLoadPrecallPlan = async (planId: string) => {
    try {
      const response = await fetch(apiUrl(`/precall-plans/${planId}`));
        if (!response.ok) {
          throw new Error("Failed to load pre-call plan");
        }

        const data = (await response.json()) as PrecallPlanDetail;

        const normalized: PrecallResult = {
          briefing: data.briefing,
          questionChecklist: (data.checklist ?? []).map((question) => ({
            ...question,
            checked: false,
          })),
          coachingNotes: data.coaching ?? [],
          metadata: {
            version: 1,
            callType: "discovery",
          },
          emailStatus: "skipped",
        };

        setPrecallResult(normalized);
        setIsPrecallChecklistOpen(true);
        setChecklistReadyMessage(null);

        setPrecallForm((previous) => ({
          ...previous,
          clientName: data.clientName ?? previous.clientName,
          companyName: data.companyName ?? previous.companyName,
          meetingGoal: data.meetingGoal ?? previous.meetingGoal,
          desiredOutcome: data.desiredOutcome ?? previous.desiredOutcome,
          offerName: data.offerName ?? previous.offerName,
        }));
      } catch (error) {
        console.error("Failed to load precall plan", error);
        setPrecallError("Could not load saved pre-call plan. Please try again.");
    }
  };

  const handleDeletePrecallPlan = async (planId: string) => {
    try {
      const response = await fetch(apiUrl(`/precall-plans/${planId}`), {
        method: "DELETE",
      });
      if (!response.ok) {
        console.error("Failed to delete precall plan", await response.text());
        setPrecallError("Could not delete pre-call plan. Please try again.");
        return;
      }
      setRecentPrecallPlans((previous) =>
        previous.filter((plan) => plan.id !== planId),
      );
    } catch (error) {
      console.error("Failed to delete precall plan", error);
      setPrecallError("Could not delete pre-call plan. Please try again.");
    }
  };

  const handleGeneratePostcallCoaching = async () => {
    if (!selectedJob) {
      setPostcallError("Select a call first.");
      return;
    }
    setPostcallError(null);

    if (
      precallResult &&
      selectedPrecallPlanIdForCoaching &&
      Array.isArray(precallResult.questionChecklist) &&
      precallResult.questionChecklist.length > 0
    ) {
      try {
        const coverageQuestions = precallResult.questionChecklist.map((question) => ({
          id: question.id,
          asked: Boolean(question.checked),
        }));

        await fetch(apiUrl(`/calls/${selectedJob.id}/checklist-coverage`), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            precallPlanId: selectedPrecallPlanIdForCoaching,
            questions: coverageQuestions,
          }),
        });
      } catch (error) {
        console.error("Error saving checklist coverage", error);
        // Do not block coaching if this fails
      }
    }

    setIsPostcallLoading(true);
    setPostcallCoaching(null);
    try {
      const response = await fetch(apiUrl("/postcall-coaching"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId: selectedJob.id,
          precallPlanId: selectedPrecallPlanIdForCoaching,
          extraNotes: "",
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to generate post-call coaching");
      }
      const data = await response.json();
      setPostcallCoaching(data.coaching as PostCallCoaching);
      setIsPostcallCoachingOpen(true);
    } catch (error) {
      console.error("Error generating post-call coaching", error);
      setPostcallError("Could not generate post-call coaching. Please try again.");
    } finally {
      setIsPostcallLoading(false);
    }
  };

  const handleRunAiCoverage = async () => {
    if (!selectedJob || !selectedPrecallPlanIdForCoaching) {
      setAiCoverageError("Select a call and pre-call plan first.");
      return;
    }

    setAiCoverageLoading(true);
    setAiCoverageError(null);
    setAiCoverage(null);
    try {
      const payload = {
        jobId: selectedJob.id,
        precallPlanId: selectedPrecallPlanIdForCoaching,
      };
      console.debug("AI coverage request", payload);
      const response = await fetch(apiUrl("/ai-checklist-coverage"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Failed to generate AI checklist coverage");
      }
      const data = (await response.json()) as { questions?: AiCoverageQuestion[] };
      setAiCoverage(Array.isArray(data.questions) ? data.questions : []);
    } catch (error) {
      console.error("Error generating AI checklist coverage", error);
      setAiCoverageError("Could not generate AI checklist coverage.");
    } finally {
      setAiCoverageLoading(false);
    }
  };

  const handleCloseAiCoverage = () => {
    setAiCoverage(null);
    setAiCoverageError(null);
  };

  const handleSaveSettings = async () => {
    setSettingsError(null);
    setSettingsSavedMessage(null);
    setIsSettingsLoading(true);
    try {
      const response = await fetch(apiUrl("/settings"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          autoPrecallEmail: settings.autoPrecallEmail,
          autoPostcallCoachingEmail: settings.autoPostcallCoachingEmail,
          theme: settings.theme,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to save settings");
      }
      await response.json();
      try {
        if (typeof window !== "undefined" && window.localStorage) {
          window.localStorage.setItem("kalyanai_theme", settings.theme);
        }
      } catch (error) {
        console.error("Failed to persist theme to localStorage", error);
      }
      setSettingsSavedMessage("Settings saved.");
    } catch (error) {
      console.error("Error saving settings", error);
      setSettingsError("Could not save settings. Please try again.");
    } finally {
      setIsSettingsLoading(false);
    }
  };

  const toggleQuestionChecked = (id: string) => {
    setPrecallResult((previous) => {
      if (!previous) {
        return previous;
      }
      return {
        ...previous,
        questionChecklist: previous.questionChecklist.map((question) =>
          question.id === id
            ? { ...question, checked: !question.checked }
            : question,
        ),
      };
    });
  };

  const renderEmailStatus = (job: Job | null) => {
    if (!job) {
      return null;
    }

    const status = job.emailStatus ?? "pending";

    if (status === "sent") {
      return "Email status: Summary sent to future@kalyanai.io.";
    }
    if (status === "error") {
      return "Email status: There was an error sending the summary email.";
    }
    return "Email status: Will be sent automatically when analysis is complete.";
  };

  return (
    <PageShell
      title="Discovery Intelligence"
      subtitle="Pre-call intel, live checklists, and post-conversation coaching in one high-performance workspace."
      headerAlign="center"
      subtitleClassName="mt-1 text-sm text-[#00C8FF]"
    >
      {/* Tabs */}
      <div className="mb-6 flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => setActiveTab("precall")}
          className={
            activeTab === "precall"
              ? "px-4 py-2 rounded-full bg-[#00C8FF] text-slate-950 font-semibold text-sm shadow"
              : "px-4 py-2 rounded-full border border-slate-700 text-slate-300 text-sm"
          }
        >
          Pre-Call Plan
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("calls")}
          className={
            activeTab === "calls"
              ? "px-4 py-2 rounded-full bg-[#00C8FF] text-slate-950 font-semibold text-sm shadow"
              : "px-4 py-2 rounded-full border border-slate-700 text-slate-300 text-sm"
          }
        >
          Discovery Calls
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("postcall")}
          className={
            activeTab === "postcall"
              ? "px-4 py-2 rounded-full bg-[#00C8FF] text-slate-950 font-semibold text-sm shadow"
              : "px-4 py-2 rounded-full border border-slate-700 text-slate-300 text-sm"
          }
        >
          Post-Call Coaching
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("settings")}
          className={
            activeTab === "settings"
              ? "px-4 py-2 rounded-full bg-[#00C8FF] text-slate-950 font-semibold text-sm shadow"
              : "px-4 py-2 rounded-full border border-slate-700 text-slate-300 text-sm"
          }
        >
          Settings
        </button>
      </div>

      {/* Pre-call tab */}
      {activeTab === "precall" && (
        <GlowCard>
          <div className="space-y-6 text-sm">
            {/* Pill + heading */}
            <div className="flex flex-col gap-2 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 self-center sm:self-start rounded-full border border-[#06B6D4]/40 bg-slate-900/70 px-3 py-1 text-[11px] text-cyan-300/90">
                <span className="h-1.5 w-1.5 rounded-full bg-[#06B6D4]" />
                <span>Sales coach</span>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-[#06B6D4]">
                Discovery Intelligence
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl self-center sm:self-start">
                Pre-call intel, live checklists, and post-conversation coaching in one high-performance workspace.
              </p>
            </div>

            {/* Form + AI output; stack on mobile, grid on md+ */}
              <div className="space-y-6 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
                {/* Form + recent plans */}
                <div className="space-y-4">
                  <form className="space-y-3" onSubmit={handlePrecallSubmit}>
                    <div className="space-y-2">
                    <div className="grid gap-2 sm:grid-cols-2">
                      <div>
                        <div className="flex items-center justify-between">
                          <label className="block text-xs font-semibold uppercase tracking-wide text-slate-300">
                            Client name
                          </label>
                          <HelpTooltip text="Who you’re meeting, so the AI can personalise the briefing." />
                        </div>
                      <input
                        type="text"
                        className="mt-1 w-full rounded-2xl border border-slate-600 bg-slate-950/50 px-3 py-2 text-sm text-white focus:border-[#06B6D4] focus:outline-none"
                        value={precallForm.clientName}
                        onChange={(event) =>
                          updatePrecallField("clientName", event.target.value)
                        }
                      />
                    </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <label className="block text-xs font-semibold uppercase tracking-wide text-slate-300">
                            Company name
                          </label>
                          <HelpTooltip text="Their company name, so the AI can describe their business correctly." />
                        </div>
                      <input
                        type="text"
                        className="mt-1 w-full rounded-2xl border border-slate-600 bg-slate-950/50 px-3 py-2 text-sm text-white focus:border-[#06B6D4] focus:outline-none"
                        value={precallForm.companyName}
                        onChange={(event) =>
                          updatePrecallField("companyName", event.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-semibold uppercase tracking-wide text-slate-300">
                        Role
                      </label>
                      <HelpTooltip text="Their job title, so questions match their level and responsibilities." />
                    </div>
                    <input
                      type="text"
                      className="mt-1 w-full rounded-2xl border border-slate-600 bg-slate-950/50 px-3 py-2 text-sm text-white focus:border-[#06B6D4] focus:outline-none"
                      value={precallForm.role}
                      onChange={(event) =>
                        updatePrecallField("role", event.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-semibold uppercase tracking-wide text-slate-300">
                        Website URL
                      </label>
                      <HelpTooltip text="Their website, so the AI can scan it and skip basic 'what do you do?' questions." />
                    </div>
                    <input
                      type="text"
                      className="mt-1 w-full rounded-2xl border border-slate-600 bg-slate-950/50 px-3 py-2 text-sm text-white focus:border-[#06B6D4] focus:outline-none"
                      value={precallForm.websiteUrl}
                      onChange={(event) =>
                        updatePrecallField("websiteUrl", event.target.value)
                      }
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-semibold uppercase tracking-wide text-slate-300">
                        LinkedIn URL
                      </label>
                      <HelpTooltip text="Optional: LinkedIn profile or company page for extra background on them." />
                    </div>
                    <input
                      type="text"
                      className="mt-1 w-full rounded-2xl border border-slate-600 bg-slate-950/50 px-3 py-2 text-sm text-white focus:border-[#06B6D4] focus:outline-none"
                      value={precallForm.linkedinUrl}
                      onChange={(event) =>
                        updatePrecallField("linkedinUrl", event.target.value)
                      }
                    />
                  </div>
                    <div className="sm:col-span-2">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-semibold uppercase tracking-wide text-slate-300">
                          Email to send pre-call plan (optional)
                        </label>
                        <HelpTooltip text="Where to email your pre-call briefing and checklist before the meeting." />
                      </div>
                    <input
                      type="email"
                      className="mt-1 w-full rounded-2xl border border-slate-600 bg-slate-950/50 px-3 py-2 text-sm text-white focus:border-[#06B6D4] focus:outline-none"
                      value={precallForm.sendToEmail}
                      onChange={(event) =>
                        updatePrecallField("sendToEmail", event.target.value)
                      }
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-semibold uppercase tracking-wide text-slate-300">
                      Notes
                    </label>
                    <HelpTooltip text="Anything you already know or want the AI to keep in mind." />
                  </div>
                  <textarea
                    className="mt-1 w-full rounded-2xl border border-slate-600 bg-slate-950/50 px-3 py-2 text-sm text-white focus:border-[#06B6D4] focus:outline-none"
                    rows={3}
                    value={precallForm.notes}
                    onChange={(event) =>
                      updatePrecallField("notes", event.target.value)
                    }
                  />
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                    <div>
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-semibold uppercase tracking-wide text-slate-300">
                          Meeting goal
                        </label>
                        <HelpTooltip text="What kind of meeting this is (discovery, partnership, review, etc.)." />
                      </div>
                    <select
                      className="mt-1 w-full rounded-2xl border border-slate-600 bg-slate-950/50 px-3 py-2 text-sm text-white focus:border-[#06B6D4] focus:outline-none"
                      value={precallForm.meetingGoal}
                      onChange={(event) =>
                        updatePrecallField("meetingGoal", event.target.value)
                      }
                    >
                      <option value="sell_service">Sell service</option>
                      <option value="sell_product">Sell product</option>
                      <option value="discovery_only">Discovery only</option>
                      <option value="partnership">Partnership</option>
                      <option value="renewal">Renewal</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-semibold uppercase tracking-wide text-slate-300">
                          Goal description
                        </label>
                        <HelpTooltip text="One line on what you want to cover in this specific meeting." />
                      </div>
                    <input
                      type="text"
                      className="mt-1 w-full rounded-2xl border border-slate-600 bg-slate-950/50 px-3 py-2 text-sm text-white focus:border-[#06B6D4] focus:outline-none"
                      value={precallForm.goalDescription}
                      onChange={(event) =>
                        updatePrecallField("goalDescription", event.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-semibold uppercase tracking-wide text-slate-300">
                        Offer name
                      </label>
                      <HelpTooltip text="Short name for what you’re offering (e.g. 'AI discovery package')." />
                    </div>
                    <input
                      type="text"
                      className="mt-1 w-full rounded-2xl border border-slate-600 bg-slate-950/50 px-3 py-2 text-sm text-white focus:border-[#06B6D4] focus:outline-none"
                      value={precallForm.offerName}
                      onChange={(event) =>
                        updatePrecallField("offerName", event.target.value)
                      }
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-semibold uppercase tracking-wide text-slate-300">
                        Offer summary
                      </label>
                      <HelpTooltip text="One or two lines describing your offer in simple language." />
                    </div>
                    <textarea
                      className="mt-1 w-full rounded-2xl border border-slate-600 bg-slate-950/50 px-3 py-2 text-sm text-white focus:border-[#06B6D4] focus:outline-none"
                      rows={2}
                      value={precallForm.offerSummary}
                      onChange={(event) =>
                        updatePrecallField("offerSummary", event.target.value)
                      }
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-semibold uppercase tracking-wide text-slate-300">
                        Desired outcome
                      </label>
                      <HelpTooltip text="The result you want by the end of this meeting (e.g. agree pilot, book proposal call)." />
                    </div>
                    <textarea
                      className="mt-1 w-full rounded-2xl border border-slate-600 bg-slate-950/50 px-3 py-2 text-sm text-white focus:border-[#06B6D4] focus:outline-none"
                      rows={2}
                      value={precallForm.desiredOutcome}
                      onChange={(event) =>
                        updatePrecallField("desiredOutcome", event.target.value)
                      }
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-[#06B6D4] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={precallLoading}
                >
                  {precallLoading ? "Generating..." : "Generate & Save Pre-Call Prep"}
                </button>

                    {precallLoading && (
                      <p className="text-center text-xs text-slate-300">
                        Building your AI briefing...
                      </p>
                    )}
                    {precallError && (
                      <p className="text-center text-xs text-red-300">
                        {precallError}
                      </p>
                    )}
                    {precallSavedMessage && !precallLoading && !precallError && (
                      <p className="mt-1 text-center text-xs text-emerald-300">
                        {precallSavedMessage}
                      </p>
                    )}
                  </form>

                  <div className="rounded-2xl border border-slate-700/60 bg-slate-950/40 p-3">
                    <div className="mb-2 flex items-center justify-between">
                      <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                        Recent Pre-Call Plans
                      </h4>
                      <button
                        type="button"
                        onClick={() => setIsRecentPlansCollapsed((previous) => !previous)}
                        className="text-[11px] font-semibold text-slate-200 underline underline-offset-4"
                      >
                        {isRecentPlansCollapsed ? "Show" : "Hide"}
                      </button>
                    </div>

                    {isRecentPlansCollapsed ? (
                      <p className="text-xs text-slate-400">
                        Plans hidden. Tap "Show" to view your recent pre-call plans.
                      </p>
                    ) : recentPrecallPlansLoading ? (
                      <p className="text-xs text-slate-400">Loading...</p>
                    ) : recentPrecallPlans.length === 0 ? (
                      <p className="text-xs text-slate-400">
                        No saved pre-call plans yet.
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {recentPrecallPlans.map((plan) => (
                          <button
                            key={plan.id}
                            type="button"
                            onClick={() => handleLoadPrecallPlan(plan.id)}
                            className="w-full rounded-2xl border border-slate-700/60 bg-slate-900/50 px-3 py-2 text-left text-xs text-slate-200 transition-colors hover:border-[#06B6D4] hover:bg-slate-900/80"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <div className="min-w-0">
                                <p className="truncate text-sm text-slate-100">
                                  {plan.clientName || "Unknown client"}
                                  {plan.companyName ? ` · ${plan.companyName}` : ""}
                                </p>
                                {plan.meetingGoal && (
                                  <p className="mt-0.5 truncate text-[11px] text-slate-400">
                                    {plan.meetingGoal}
                                  </p>
                                )}
                              </div>
                              <div className="flex items-center gap-2 shrink-0 text-right">
                                <p className="text-[11px] text-slate-400">
                                  {formatShortDate(plan.createdAt)}
                                </p>
                                <button
                                  type="button"
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    void handleDeletePrecallPlan(plan.id);
                                  }}
                                  className="text-[11px] text-red-400 underline-offset-2 hover:text-red-300 hover:underline"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    {recentPrecallPlansError && (
                      <p className="mt-2 text-[11px] text-red-300">
                        {recentPrecallPlansError}
                      </p>
                    )}
                  </div>
                </div>

              {/* AI output */}
              <div className="space-y-4 rounded-2xl border border-slate-700/60 bg-slate-950/40 p-4">
                {!precallResult ? (
                  <p className="text-slate-300">
                    Generate a pre-call briefing to see AI insights, custom checklist, and coaching notes here.
                  </p>
                ) : (
                  <>
                    {precallResult.emailStatus === "sent" && (
                      <p className="text-xs font-semibold text-emerald-300">
                        Pre-call email sent successfully.
                      </p>
                    )}
                    {precallResult.emailStatus === "error" && (
                      <p className="text-xs font-semibold text-amber-300">
                        Pre-call email could not be sent (check email settings).
                      </p>
                    )}

                    <div>
                      <div className="mb-1 flex items-center justify-between gap-2">
                        <h4 className="text-base font-semibold text-[#06B6D4]">
                          Question Checklist
                        </h4>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setIsLiveChecklistOpen(true)}
                            className="inline-flex items-center rounded-full border border-slate-600 px-3 py-1 text-[11px] font-semibold text-slate-200 hover:border-[#06B6D4] hover:text-[#06B6D4]"
                          >
                            Open Live Checklist
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setIsPrecallChecklistOpen((previous) => !previous)
                            }
                            className="inline-flex items-center rounded-full border border-slate-600 px-3 py-1 text-[11px] font-semibold text-slate-200 hover:border-[#06B6D4] hover:text-[#06B6D4]"
                          >
                            {isPrecallChecklistOpen ? "Close" : "Open"}
                          </button>
                        </div>
                      </div>
                      {isPrecallChecklistOpen && (
                        <>
                          <p className="mt-1 text-[11px] text-amber-300">
                            Use this checklist during your discovery call. Whilst on or after the call, tick what you covered and mark it ready for coaching.
                          </p>
                          <div className="mt-2 space-y-2">
                            {precallResult.questionChecklist.length === 0 ? (
                              <p className="text-xs text-slate-400">
                                No questions generated for this goal yet.
                              </p>
                            ) : (
                              precallResult.questionChecklist.map((question) => (
                                <label
                                  key={question.id}
                                  className="flex items-start gap-3 rounded-2xl border border-slate-700/70 bg-slate-900/50 px-3 py-2"
                                >
                                  <input
                                    type="checkbox"
                                    className="mt-1 h-4 w-4 rounded border-slate-600 text-[#06B6D4] focus:ring-[#06B6D4]"
                                    checked={Boolean(question.checked)}
                                    onChange={() => toggleQuestionChecked(question.id)}
                                  />
                                  <div>
                                    <p className="text-sm text-white">
                                      {question.question}
                                    </p>
                                    <div className="mt-1 flex flex-wrap gap-1">
                                      <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-300">
                                        {question.category}
                                      </span>
                                      <span
                                        className={getImportanceBadgeClasses(question.importance)}
                                      >
                                        {question.importance}
                                      </span>
                                      <span className={getSourceBadgeClasses(question.source)}>
                                        {question.source}
                                      </span>
                                    </div>
                                  </div>
                                </label>
                              ))
                            )}
                          </div>
                          <div className="mt-3 space-y-1">
                            <button
                              type="button"
                              onClick={() => {
                                setChecklistReadyMessage(
                                  "Checklist marked as ready. When you generate Post-Call Coaching, this checklist will be used.",
                                );
                              }}
                              className="text-[11px] font-semibold text-amber-300 underline underline-offset-4"
                            >
                              Mark checklist ready for coaching
                            </button>
                            {checklistReadyMessage && (
                              <p className="text-[11px] text-amber-300">
                                {checklistReadyMessage}
                              </p>
                            )}
                          </div>
                        </>
                      )}
                    </div>

                    {(() => {
                      const rawMeetingSuccess =
                        precallResult.meetingSuccess &&
                        precallResult.meetingSuccess.trim().length > 0
                          ? precallResult.meetingSuccess
                          : "";
                      const fallbackMeetingSuccess =
                        !rawMeetingSuccess && precallForm.desiredOutcome
                          ? `This call is successful if by the end you have: ${precallForm.desiredOutcome}.`
                          : "";
                      const meetingSuccessText = rawMeetingSuccess || fallbackMeetingSuccess;

                      return (
                        meetingSuccessText && (
                          <div className="mt-4 border-t border-slate-800 pt-3">
                            <h4 className="text-base font-semibold text-[#06B6D4]">
                              Call Success
                            </h4>
                            <p className="mt-1 text-sm text-slate-200">
                              <span className="font-semibold">
                                What success looks like for this call:{" "}
                              </span>
                              {meetingSuccessText}
                            </p>
                          </div>
                        )
                      );
                    })()}

                    <div className="mt-4 border-t border-slate-800 pt-3">
                      <button
                        type="button"
                        onClick={() => setShowBriefing((previous) => !previous)}
                        className="flex w-full items-center justify-between text-left cursor-pointer"
                      >
                        <h4 className="text-base font-semibold text-[#06B6D4]">
                          Briefing
                        </h4>
                        <span className="text-xs text-slate-300">
                          {showBriefing ? "Hide" : "Show"}
                        </span>
                      </button>
                      {showBriefing && (
                        <div className="mt-2 space-y-2 text-slate-200">
                          <p>{precallResult.briefing.clientOverview}</p>
                          <p>{precallResult.briefing.companyOverview}</p>
                          <p>{precallResult.briefing.meetingFocus}</p>
                        </div>
                      )}
                    </div>

                    <div className="pt-3">
                      <button
                        type="button"
                        onClick={() => setShowCoaching((previous) => !previous)}
                        className="flex w-full items-center justify-between text-left cursor-pointer"
                      >
                        <h4 className="text-base font-semibold text-[#06B6D4]">
                          Coaching Notes
                        </h4>
                        <span className="text-xs text-slate-300">
                          {showCoaching ? "Hide" : "Show"}
                        </span>
                      </button>
                      {showCoaching && (
                        <ul className="mt-2 space-y-1 text-slate-200">
                          {precallResult.coachingNotes.map((note, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-sm"
                            >
                              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#06B6D4]" />
                              <span>{note}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </GlowCard>
      )}

      {activeTab === "postcall" && (
        <GlowCard>
          <div className="space-y-6 text-sm">
            {/* Heading */}
            <div className="flex flex-col gap-2 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 self-center sm:self-start rounded-full border border-[#06B6D4]/40 bg-slate-900/80 px-3 py-1 text-[11px] text-cyan-300/90">
                <span className="h-1.5 w-1.5 rounded-full bg-[#06B6D4]" />
                <span>Post-call coaching</span>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-[#06B6D4]">
                Discovery Intelligence
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl self-center sm:self-start">
                Pre-call intel, live checklists, and post-conversation coaching in one high-performance workspace.
              </p>
            </div>

            <div className="space-y-6 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
              {/* Left: calls list (reuse jobs) */}
              <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
                <div className="mb-1 flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-[#06B6D4]">Calls</h4>
                </div>
                {jobs.length === 0 ? (
                  <p className="text-sm text-slate-300">
                    No calls have been processed yet.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {jobs.map((job) => (
                      <button
                        key={job.id}
                        type="button"
                        onClick={() => {
                          setSelectedJob(job);
                          setPostcallCoaching(null);
                          setPostcallError(null);
                          setIsPostcallCoachingOpen(true);
                        }}
                        className={`w-full rounded-2xl border border-slate-700/80 bg-slate-900 px-4 py-3 text-left text-sm transition-colors hover:border-[#06B6D4]/70 ${
                          selectedJob?.id === job.id ? "border-[#06B6D4]" : ""
                        }`}
                      >
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <p className="font-semibold text-white truncate max-w-[220px]">
                              {job.originalname || job.filename}
                            </p>
                            <p className="text-xs text-slate-400">
                              {formatDateTime(job.createdAt)}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-1 text-right">
                            <span className={getBadgeClasses(job.status)}>
                              {job.status}
                            </span>
                            <span
                              className="text-[11px] font-semibold text-red-400 underline-offset-2 transition hover:text-red-300 hover:underline"
                              onClick={(event) => {
                                event.stopPropagation();
                                handleDeleteJob(job.id);
                              }}
                            >
                              Delete
                            </span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: coaching details */}
              <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
                <h4 className="text-sm font-semibold text-[#06B6D4]">
                  Coaching
                </h4>
                {!selectedJob ? (
                  <p className="text-sm text-slate-300">
                    Select a call on the left to generate coaching.
                  </p>
                ) : (
                  <>
                    <div className="space-y-1 text-xs text-slate-300">
                      <p className="font-semibold text-white">
                        {selectedJob.originalname || selectedJob.filename}
                      </p>
                      <p>{formatDateTime(selectedJob.createdAt)}</p>
                    </div>
                    <div className="space-y-1 text-xs text-slate-300">
                      <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-300">
                        Link pre-call plan (optional)
                      </label>
                      <select
                        className="mt-1 w-full rounded-2xl border border-slate-600 bg-slate-950/50 px-3 py-2 text-xs text-white focus:border-[#06B6D4] focus:outline-none"
                        value={selectedPrecallPlanIdForCoaching ?? ""}
                        onChange={(event) =>
                          setSelectedPrecallPlanIdForCoaching(
                            event.target.value === "" ? null : event.target.value,
                          )
                        }
                      >
                        <option value="">No linked pre-call plan</option>
                        {recentPrecallPlans.map((plan) => (
                          <option key={plan.id} value={plan.id}>
                            {plan.clientName || "Unknown client"}
                            {plan.companyName ? ` · ${plan.companyName}` : ""}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <button
                        type="button"
                        onClick={handleGeneratePostcallCoaching}
                        className="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-[#06B6D4] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
                        disabled={isPostcallLoading}
                      >
                        {isPostcallLoading ? "Generating coaching..." : "Generate Coaching"}
                      </button>
                    </div>
                    <div className="mt-4 rounded-2xl border border-slate-800/70 bg-slate-950/40 p-4">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm font-semibold text-[#06B6D4]">
                            AI checklist coverage
                          </p>
                          <p className="text-xs text-slate-400">
                            Compare the planned questions vs what the transcript shows.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={handleRunAiCoverage}
                          className="inline-flex items-center justify-center rounded-full border border-slate-600 px-4 py-2 text-xs font-semibold text-slate-100 transition hover:border-[#06B6D4] hover:text-[#06B6D4] disabled:cursor-not-allowed disabled:opacity-60"
                          disabled={
                            !selectedJob ||
                            !selectedPrecallPlanIdForCoaching ||
                            aiCoverageLoading
                          }
                        >
                          {aiCoverageLoading ? "Analyzing..." : "Run AI checklist coverage"}
                        </button>
                      </div>
                      {aiCoverageLoading && (
                        <p className="mt-2 text-xs text-slate-300">
                          Analyzing checklist vs transcript...
                        </p>
                      )}
                      {aiCoverageError && (
                        <p className="mt-2 text-xs text-red-300">{aiCoverageError}</p>
                      )}
                      {aiCoverage && aiCoverage.length > 0 ? (
                        <div className="mt-3 space-y-3 text-xs text-slate-200">
                          <ul className="space-y-2">
                            {aiCoverage.map((item) => {
                              const statusLabel = item.status.replace(/_/g, " ");
                              const confidenceText =
                                typeof item.confidence === "number"
                                  ? ` · Confidence ${(item.confidence * 100).toFixed(0)}%`
                                  : "";
                              return (
                                <li
                                  key={item.id}
                                  className="rounded-xl border border-slate-800/60 bg-slate-900/60 p-3"
                                >
                                  <p className="text-sm font-semibold text-white">
                                    {item.question || "Question"}
                                  </p>
                                  <p className="mt-1 text-xs text-slate-300">
                                    AI: <span className="font-semibold capitalize">{statusLabel}</span>
                                    {confidenceText}
                                  </p>
                                  {item.rationale && (
                                    <p className="mt-1 text-[11px] text-slate-400">
                                      Why: {item.rationale}
                                    </p>
                                  )}
                                </li>
                              );
                            })}
                          </ul>
                          <button
                            type="button"
                            onClick={handleCloseAiCoverage}
                            className="inline-flex items-center justify-center rounded-full border border-slate-600 px-4 py-1.5 text-xs font-semibold text-slate-100 transition hover:border-[#06B6D4] hover:text-[#06B6D4]"
                          >
                            Close AI coverage
                          </button>
                        </div>
                      ) : (
                        !aiCoverageLoading &&
                        !aiCoverageError && (
                          <p className="mt-3 text-[11px] text-slate-400">
                            Run AI checklist coverage to see which questions were covered in the call.
                          </p>
                        )
                      )}
                    </div>
                    {postcallError && (
                      <p className="mt-2 text-xs text-red-300">{postcallError}</p>
                    )}
                    {!isPostcallLoading && postcallCoaching && (() => {
                      const coaching = postcallCoaching;
                      const goalSummary =
                        typeof coaching?.goalSummary === "string" ? coaching.goalSummary : "";
                      const goalComment =
                        typeof coaching?.goalComment === "string" ? coaching.goalComment : "";
                      const goalAchieved =
                        typeof coaching?.goalAchieved === "boolean" ? coaching.goalAchieved : null;
                      const strengthsText =
                        typeof coaching?.strengths === "string"
                          ? coaching.strengths
                          : Array.isArray(coaching?.strengths)
                            ? coaching.strengths.join("\n")
                            : "";
                      const improvementAreasText =
                        typeof coaching?.improvementAreas === "string"
                          ? coaching.improvementAreas
                          : Array.isArray(coaching?.improvementAreas)
                            ? coaching.improvementAreas.join("\n")
                            : "";
                      const coachingTipsText =
                        typeof coaching?.coachingTips === "string"
                          ? coaching.coachingTips
                          : Array.isArray(coaching?.coachingTips)
                            ? coaching.coachingTips.join("\n")
                            : "";
                      const followUpsText =
                        typeof coaching?.followUpsForClient === "string"
                          ? coaching.followUpsForClient
                          : Array.isArray(coaching?.followUpsForClient)
                            ? coaching.followUpsForClient.join("\n")
                            : "";
                      const missedQuestions: string[] = Array.isArray(coaching?.missedQuestions)
                        ? coaching.missedQuestions
                        : [];
                      const primaryNextAction =
                        typeof coaching?.primaryNextAction === "string"
                          ? coaching.primaryNextAction
                          : "";
                      const nextActionSteps: string[] = Array.isArray(coaching?.nextActionSteps)
                        ? coaching.nextActionSteps
                        : [];
                      const riskLevel =
                        typeof coaching?.riskLevel === "string" ? coaching.riskLevel : "";
                      const opportunitySize =
                        typeof coaching?.opportunitySize === "string"
                          ? coaching.opportunitySize
                          : "";

                      return (
                        <div
                            className={`mt-3 space-y-3 text-xs sm:text-sm text-slate-200 ${
                              isPostcallCoachingOpen ? "" : "hidden"
                            }`}
                          >
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold text-[#06B6D4]">
                              Coaching Summary
                            </p>
                          </div>
                          <div className="rounded-2xl border border-slate-700/70 bg-slate-900/60 p-3 space-y-1">
                            <h4 className="text-sm font-semibold text-[#06B6D4]">
                              Goal &amp; Outcome
                            </h4>
                            {goalSummary && (
                              <p className="text-xs text-slate-200">
                                <span className="font-semibold">Goal: </span>
                                {goalSummary}
                              </p>
                            )}
                            {goalAchieved !== null && (
                              <p className="text-xs text-slate-200">
                                <span className="font-semibold">
                                  Did you move towards your goal?{" "}
                                </span>
                                {goalAchieved ? "Yes" : "Not fully"}
                              </p>
                            )}
                            {goalComment && (
                              <p className="text-xs text-slate-300">
                                {goalComment}
                              </p>
                            )}
                          </div>
                          <div className="mt-3 rounded-2xl border border-slate-700/70 bg-slate-900/60 p-3 space-y-2">
                            <h4 className="text-sm font-semibold text-[#06B6D4]">
                              Your Next Move
                            </h4>
                            <p className="text-[11px] text-slate-400">
                              Internal actions for <span className="font-semibold">you</span> – what you should do next to move this deal forward.
                            </p>
                            {primaryNextAction && (
                              <p className="text-xs text-slate-200">
                                <span className="font-semibold">Primary action: </span>
                                {primaryNextAction}
                              </p>
                            )}
                            {nextActionSteps.length > 0 && (
                              <ul className="list-disc pl-4 text-xs text-slate-200">
                                {nextActionSteps.map((step, index) => (
                                  <li key={index}>{step}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-[#06B6D4]">Strengths</p>
                            <p className="mt-1 whitespace-pre-line text-slate-200">
                              {strengthsText || "No specific strengths were generated."}
                            </p>
                          </div>
                          <div>
                            <p className="font-semibold text-[#06B6D4]">What to improve</p>
                            <p className="mt-1 whitespace-pre-line text-slate-200">
                              {improvementAreasText || "No improvement areas were generated."}
                            </p>
                          </div>
                          <div>
                            <p className="font-semibold text-[#06B6D4]">Coaching tips</p>
                            <p className="mt-1 whitespace-pre-line text-slate-200">
                              {coachingTipsText || "No coaching tips were generated."}
                            </p>
                          </div>
                          <div>
                            <p className="font-semibold text-[#06B6D4]">Missed questions</p>
                            {missedQuestions.length === 0 ? (
                              <p className="mt-1 text-xs text-slate-400">
                                No missed questions were recorded.
                              </p>
                            ) : (
                              <ul className="mt-1 list-disc pl-4">
                                {missedQuestions.map((item, index) => (
                                  <li key={index}>{item}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-[#06B6D4]">Client Follow-Up</p>
                            <p className="text-[11px] text-slate-400">
                              What the client should receive next – emails, documents, meetings, or promises you need to deliver.
                            </p>
                            <p className="mt-1 whitespace-pre-line text-slate-200">
                              {followUpsText || "No follow-ups were generated for this client."}
                            </p>
                          </div>
                          {(riskLevel || opportunitySize) && (
                            <div className="rounded-2xl border border-slate-700/70 bg-slate-900/60 p-3 text-xs text-slate-200">
                              <h4 className="text-sm font-semibold text-[#06B6D4]">Deal Outlook</h4>
                              <div className="mt-1 space-y-1 text-slate-300">
                                {riskLevel && (
                                  <p className="text-xs text-slate-200 flex items-start gap-1">
                                    <span className="inline-flex items-center gap-1 font-semibold">
                                      Risk level
                                      <HelpTooltip text="How likely this deal is to stall or fall through based on gaps in discovery, objections, and timeline." />
                                      :
                                    </span>
                                    <span>{riskLevel}</span>
                                  </p>
                                )}
                                {opportunitySize && (
                                  <p className="text-xs text-slate-200">
                                    <span className="font-semibold">Opportunity size: </span>
                                    {opportunitySize}
                                  </p>
                                )}
                              </div>
                              <div className="mt-3 flex justify-end">
                                <button
                                  type="button"
                                  onClick={() => setIsPostcallCoachingOpen(false)}
                                  className="inline-flex items-center justify-center rounded-full border border-slate-600 px-4 py-2 text-sm font-semibold text-slate-100 transition-colors hover:bg-slate-800/80"
                                >
                                  Close coaching summary
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </>
                )}
              </div>
            </div>
          </div>
        </GlowCard>
      )}

      {activeTab === "settings" && (
        <GlowCard>
          <div
            className={
              isLightTheme
                ? "space-y-6 text-sm text-slate-900"
                : "space-y-6 text-sm text-slate-100"
            }
          >
            <div className="flex flex-col gap-2 text-center sm:text-left">
              <div
                className={
                  isLightTheme
                    ? "inline-flex items-center gap-2 self-center sm:self-start rounded-full border border-cyan-300/60 bg-cyan-50 px-3 py-1 text-[11px] text-cyan-700"
                    : "inline-flex items-center gap-2 self-center sm:self-start rounded-full border border-[#06B6D4]/40 bg-slate-900/80 px-3 py-1 text-[11px] text-cyan-300/90"
                }
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#06B6D4]" />
                <span>Preferences</span>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-[#06B6D4]">
                Discovery Intelligence
              </h3>
              <p
                className={
                  isLightTheme
                    ? "text-xs sm:text-sm text-slate-700 max-w-xl self-center sm:self-start"
                    : "text-xs sm:text-sm text-slate-300 max-w-xl self-center sm:self-start"
                }
              >
                Pre-call intel, live checklists, and post-conversation coaching in one high-performance workspace.
              </p>
            </div>

            <div
              className={
                isLightTheme
                  ? "space-y-4 rounded-2xl border border-slate-200 bg-white p-4"
                  : "space-y-4 rounded-2xl border border-slate-800 bg-slate-950/40 p-4"
              }
            >
              {isSettingsLoading && (
                <p
                  className={
                    isLightTheme
                      ? "text-xs text-slate-700"
                      : "text-xs text-slate-300"
                  }
                >
                  Loading settings...
                </p>
              )}
              {settingsError && (
                <p className="text-xs text-red-300">{settingsError}</p>
              )}

              <div className="space-y-3">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 rounded border-slate-600 text-[#06B6D4] focus:ring-[#06B6D4]"
                    checked={settings.autoPrecallEmail}
                    onChange={(event) =>
                      setSettings((prev) => ({
                        ...prev,
                        autoPrecallEmail: event.target.checked,
                      }))
                    }
                  />
                  <div>
                    <p
                      className={
                        isLightTheme ? "text-sm text-slate-900" : "text-sm text-white"
                      }
                    >
                      Send pre-call briefing emails automatically
                    </p>
                    <p
                      className={
                        isLightTheme
                          ? "text-[11px] text-slate-600"
                          : "text-[11px] text-slate-400"
                      }
                    >
                      When enabled, pre-call plans will be emailed to the address you enter without extra clicks.
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 rounded border-slate-600 text-[#06B6D4] focus:ring-[#06B6D4]"
                    checked={settings.autoPostcallCoachingEmail}
                    onChange={(event) =>
                      setSettings((prev) => ({
                        ...prev,
                        autoPostcallCoachingEmail: event.target.checked,
                      }))
                    }
                  />
                  <div>
                    <p
                      className={
                        isLightTheme ? "text-sm text-slate-900" : "text-sm text-white"
                      }
                    >
                      Send post-call coaching emails automatically
                    </p>
                    <p
                      className={
                        isLightTheme
                          ? "text-[11px] text-slate-600"
                          : "text-[11px] text-slate-400"
                      }
                    >
                      When enabled, coaching summaries will be emailed after you generate Post-Call Coaching.
                    </p>
                  </div>
                </label>
              </div>

              <div className="mt-4 space-y-2">
                <p
                  className={
                    isLightTheme
                      ? "text-sm font-semibold text-slate-900"
                      : "text-sm font-semibold text-white"
                  }
                >
                  Theme
                </p>
                <p
                  className={
                    isLightTheme
                      ? "text-[11px] text-slate-600"
                      : "text-[11px] text-slate-400"
                  }
                >
                  Dark mode is the current look. Light mode will be used later, but you can choose your preference now.
                </p>
                <div className="mt-2 flex gap-3">
                  <label
                    className={
                      isLightTheme
                        ? "inline-flex items-center gap-2 text-sm text-slate-900"
                        : "inline-flex items-center gap-2 text-sm text-slate-200"
                    }
                  >
                    <input
                      type="radio"
                      name="theme"
                      value="dark"
                      className="h-4 w-4 border-slate-600 text-[#06B6D4] focus:ring-[#06B6D4]"
                      checked={settings.theme === "dark"}
                      onChange={() =>
                        setSettings((prev) => ({ ...prev, theme: "dark" }))
                      }
                    />
                    <span>Dark</span>
                  </label>
                  <label
                    className={
                      isLightTheme
                        ? "inline-flex items-center gap-2 text-sm text-slate-900"
                        : "inline-flex items-center gap-2 text-sm text-slate-200"
                    }
                  >
                    <input
                      type="radio"
                      name="theme"
                      value="light"
                      className="h-4 w-4 border-slate-600 text-[#06B6D4] focus:ring-[#06B6D4]"
                      checked={settings.theme === "light"}
                      onChange={() =>
                        setSettings((prev) => ({ ...prev, theme: "light" }))
                      }
                    />
                    <span>Light</span>
                  </label>
                </div>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={handleSaveSettings}
                  className={
                    isLightTheme
                      ? "inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-[#06B6D4] px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
                      : "inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-[#06B6D4] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
                  }
                  disabled={isSettingsLoading}
                >
                  {isSettingsLoading ? "Saving..." : "Save settings"}
                </button>
                {settingsSavedMessage && (
                  <p className="text-xs text-emerald-300">{settingsSavedMessage}</p>
                )}
              </div>
            </div>
          </div>
        </GlowCard>
      )}

      {isLiveChecklistOpen && precallResult && (
          <div className="fixed inset-0 z-50 flex items-stretch justify-center bg-black/70 px-0 sm:px-4">
            <div className="flex h-full w-full max-w-md flex-col border border-slate-800 bg-slate-950 shadow-xl sm:my-8 sm:h-auto sm:max-w-2xl sm:rounded-2xl">
              <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-slate-800 bg-slate-900 px-4 py-3">
                <h3 className="text-sm font-semibold text-[#06B6D4] sm:text-base">
                  Live Call Checklist
                </h3>
                <button
                  type="button"
                  onClick={() => setIsLiveChecklistOpen(false)}
                  className="rounded-full border border-slate-600 px-3 py-1 text-xs font-semibold text-slate-200 hover:border-[#06B6D4] hover:text-[#06B6D4]"
                >
                  Close
                </button>
              </div>
              <div className="flex-1 space-y-2 overflow-y-auto px-4 py-3">
                <p className="mb-2 text-[11px] text-amber-300">
                  Use this checklist during your discovery call. Whilst on or after the call, tick what you covered and mark it ready for coaching.
                </p>
                {precallResult.questionChecklist.length === 0 ? (
                  <p className="text-xs text-slate-400">
                    No questions generated for this goal yet.
                  </p>
                ) : (
                  precallResult.questionChecklist.map((question) => (
                    <label
                      key={question.id}
                      className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2 text-sm hover:border-[#06B6D4]/80"
                    >
                      <input
                        type="checkbox"
                        className="mt-1 h-5 w-5 rounded border-slate-600 text-[#06B6D4] focus:ring-[#06B6D4]"
                        checked={Boolean(question.checked)}
                        onChange={() => toggleQuestionChecked(question.id)}
                      />
                      <div>
                        <p className="text-sm leading-relaxed text-white">{question.question}</p>
                        <div className="mt-1 flex flex-wrap gap-1">
                          <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-300">
                            {question.category}
                          </span>
                          <span className={getImportanceBadgeClasses(question.importance)}>
                            {question.importance}
                          </span>
                          <span className={getSourceBadgeClasses(question.source)}>
                            {question.source}
                          </span>
                        </div>
                      </div>
                    </label>
                  ))
                )}
                <div className="mt-3 space-y-1">
                  <button
                    type="button"
                    onClick={() => {
                      setChecklistReadyMessage(
                        "Checklist marked as ready. When you generate Post-Call Coaching, this checklist will be used.",
                      );
                    }}
                    className="text-[11px] font-semibold text-amber-300 underline underline-offset-4"
                  >
                    Mark checklist ready for coaching
                  </button>
                  {checklistReadyMessage && (
                    <p className="text-[11px] text-amber-300">
                      {checklistReadyMessage}
                    </p>
                  )}
                </div>
              </div>
              <div className="border-t border-slate-800 bg-slate-900 px-4 py-3">
                <button
                  type="button"
                  onClick={() => setIsLiveChecklistOpen(false)}
                  className="inline-flex w-full items-center justify-center rounded-full border border-slate-600 px-4 py-2 text-sm font-semibold text-slate-100 hover:border-[#06B6D4] hover:text-[#06B6D4] sm:w-auto"
                >
                  Close checklist
                </button>
              </div>
            </div>
          </div>
        )}

      {/* Discovery Calls tab */}
      {activeTab === "calls" && (
        <GlowCard>
          <div className="space-y-6 text-sm">
            {/* Pill + heading */}
            <div className="flex flex-col gap-2 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 self-center sm:self-start rounded-full border border-[#06B6D4]/40 bg-slate-900/80 px-3 py-1 text-[11px] text-cyan-300/90">
                <span className="h-1.5 w-1.5 rounded-full bg-[#06B6D4] animate-pulse" />
                <span>Call analysis</span>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-[#06B6D4]">
                Discovery Intelligence
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl self-center sm:self-start">
                Pre-call intel, live checklists, and post-conversation coaching in one high-performance workspace.
              </p>
            </div>

            {/* Main grid: left = upload, right = calls + details */}
            <div className="space-y-6 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
              {/* Left column: upload + status */}
              <div className="space-y-4">
                <input
                  id="recording"
                  type="file"
                  className="hidden"
                  onChange={(event) => {
                    const selected = event.target.files?.[0] ?? null;
                    setFile(selected);
                  }}
                />

                <div className="flex flex-col items-center sm:items-start sm:flex-row sm:gap-3">
                  <label
                    htmlFor="recording"
                    className="inline-flex cursor-pointer items-center justify-center rounded-full border border-slate-500/70 bg-transparent px-4 py-2 text-sm font-semibold text-slate-300 transition-colors hover:bg-slate-800/80"
                  >
                    Choose file
                  </label>

                  {file && (
                    <span className="mt-2 max-w-[220px] truncate text-center text-sm text-slate-200 sm:mt-0 sm:text-left">
                      {file.name}
                    </span>
                  )}
                </div>

                <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-start">
                  <button
                    type="button"
                    className="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-[#06B6D4] px-7 py-3.5 text-base font-semibold text-white shadow-md ring-2 ring-cyan-300/70 ring-offset-2 ring-offset-slate-950 transition-all hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
                    onClick={handleUpload}
                    disabled={!file || isUploading}
                  >
                    {isUploading ? "Uploading..." : "Run Analysis"}
                  </button>
                  <button
                    type="button"
                    className="inline-flex w-full sm:w-auto max-w-xs items-center justify-center rounded-full border border-slate-600/80 px-6 py-2.5 text-sm font-semibold text-slate-400 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                    onClick={fetchJobs}
                    disabled={isLoadingJobs}
                  >
                    {isLoadingJobs ? "Refreshing..." : "Refresh"}
                  </button>
                </div>

                {statusMessage && (
                  <p className="text-center sm:text-left text-sm text-slate-300">
                    {statusMessage}
                  </p>
                )}
              </div>

              {/* Right column: recent calls + details */}
              <div className="space-y-6">
                {/* Recent calls */}
                <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
                  <div className="mb-1 flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-[#06B6D4]">
                      Recent Calls
                    </h4>
                    {previousJobs.length > 0 && (
                      <button
                        type="button"
                        onClick={() =>
                          setShowPreviousCalls((previous) => !previous)
                        }
                        className="text-[11px] font-semibold text-slate-200 underline underline-offset-4"
                      >
                        {showPreviousCalls
                          ? "Hide previous calls"
                          : "Show previous calls"}
                      </button>
                    )}
                  </div>

                  {jobsError ? (
                    <p className="text-sm text-red-300">{jobsError}</p>
                  ) : !latestJob ? (
                    <p className="text-sm text-slate-300">
                      No calls have been processed yet.
                    </p>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => setSelectedJob(latestJob)}
                        className={`w-full rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-4 text-left transition-colors hover:border-[#06B6D4] ${
                          selectedJob?.id === latestJob.id
                            ? "border-[#06B6D4]"
                            : ""
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <p className="text-sm font-semibold text-white">
                              {latestJob.originalname || latestJob.filename}
                            </p>
                            <p className="text-xs text-slate-400">
                              {formatDateTime(latestJob.createdAt)}
                            </p>
                          </div>
                          <span className={getBadgeClasses(latestJob.status)}>
                            {latestJob.status}
                          </span>
                        </div>

                        {latestEmailStatusHint && (
                          <p className={`mt-1 ${latestEmailStatusHint.className}`}>
                            {latestEmailStatusHint.text}
                          </p>
                        )}

                        {latestJob.status === "done" && (
                          <p className="mt-2 text-xs text-emerald-300">
                            Call summary is ready - click "View details".
                          </p>
                        )}
                        {latestJob.status === "processing" && (
                          <p className="mt-2 text-xs text-amber-300">
                            Analysis in progress...
                          </p>
                        )}
                        {latestJob.status === "error" && latestJob.error && (
                          <p className="mt-2 text-xs text-red-300">
                            {latestJob.error}
                          </p>
                        )}

                        <p className="mt-3 text-xs font-semibold text-white underline underline-offset-2">
                          View details
                        </p>
                      </button>

                      {showPreviousCalls && previousJobs.length > 0 && (
                        <div className="mt-2 space-y-2">
                          {previousJobs.map((job) => {
                            const emailStatusHint = getEmailStatusHint(job);
                            return (
                              <button
                                key={job.id}
                                type="button"
                                onClick={() => setSelectedJob(job)}
                                className={`w-full rounded-2xl border border-slate-700/80 bg-slate-900 px-4 py-3 text-left text-sm transition-colors hover:border-[#06B6D4]/70 ${
                                  selectedJob?.id === job.id
                                    ? "border-[#06B6D4]"
                                    : ""
                                }`}
                              >
                                <div className="flex flex-wrap items-start justify-between gap-2">
                                  <div>
                                    <p className="font-semibold text-white">
                                      {job.originalname || job.filename}
                                    </p>
                                    <p className="text-xs text-slate-400">
                                      {formatDateTime(job.createdAt)}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className={getBadgeClasses(job.status)}>
                                      {job.status}
                                    </span>
                                    <span
                                      className="ml-2 text-xs text-red-400 underline-offset-2 transition hover:text-red-300 hover:underline"
                                      onClick={(event) => {
                                        event.stopPropagation();
                                        handleDeleteJob(job.id);
                                      }}
                                    >
                                      Delete
                                    </span>
                                  </div>
                                </div>

                                {emailStatusHint && (
                                  <p
                                    className={`mt-1 ${emailStatusHint.className}`}
                                  >
                                    {emailStatusHint.text}
                                  </p>
                                )}

                                {job.status === "done" && (
                                  <p className="mt-1 text-xs text-emerald-300">
                                    Call summary is ready - click "View details".
                                  </p>
                                )}
                                {job.status === "processing" && (
                                  <p className="mt-1 text-xs text-amber-300">
                                    Analysis in progress...
                                  </p>
                                )}
                                {job.status === "error" && job.error && (
                                  <p className="mt-1 text-xs text-red-300">
                                    {job.error}
                                  </p>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Call details */}
                <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
                  <h4 className="text-sm font-semibold text-[#06B6D4]">
                    Call Details
                  </h4>

                  {!selectedJob ? (
                    <p className="text-sm text-slate-300">
                      Select a call from Recent Calls to see details.
                    </p>
                  ) : (
                    <div className="space-y-4 text-sm text-slate-200">
                      <div>
                        <p className="mb-1 text-sm font-semibold text-[#06B6D4]">
                          Filename
                        </p>
                        <p className="text-sm text-white break-words">
                          {selectedJob.originalname || selectedJob.filename}
                        </p>
                      </div>

                      <div>
                        <p className="font-semibold text-white">Status</p>
                        <span className={getBadgeClasses(selectedJob.status)}>
                          {selectedJob.status}
                        </span>
                      </div>

                      <div>
                        <p className="mb-1 text-sm font-semibold text-[#06B6D4]">
                          Created At
                        </p>
                        <p>{formatDateTime(selectedJob.createdAt)}</p>
                      </div>

                      {/* Parse analysisJson once */}
                      {(() => {
                        const analysis = parseAnalysisJson(selectedJob.analysisJson);

                        return (
                          <>
                            <div>
                              <p className="mb-1 text-sm font-semibold text-[#06B6D4]">
                                Call Summary
                              </p>
                              <p className="text-slate-300">
                                {analysis?.callSummary?.trim().length
                                  ? analysis.callSummary
                                  : selectedJob.resultSummary?.trim().length
                                    ? selectedJob.resultSummary
                                    : "Summary will appear here once analysis is complete."}
                              </p>
                            </div>

                            <div>
                              <p className="mb-1 text-sm font-semibold text-[#06B6D4]">
                                Top priorities
                              </p>
                              <div className="text-slate-300">
                                {renderListOrText(
                                  analysis?.topPriorities ?? analysis?.TOP_PRIORITY,
                                )}
                              </div>
                            </div>

                            <div>
                              <p className="mb-1 text-sm font-semibold text-[#06B6D4]">
                                Pain points
                              </p>
                              <div className="text-slate-300">
                                {renderListOrText(
                                  analysis?.painPoints ?? analysis?.RED_FLAGS,
                                )}
                              </div>
                            </div>

                            <div>
                              <p className="mb-1 text-sm font-semibold text-[#06B6D4]">
                                Timeline &amp; urgency
                              </p>
                              <p className="text-slate-300">
                                {analysis?.timelineUrgency?.trim().length
                                  ? analysis.timelineUrgency
                                  : analysis?.READINESS_CONSTRAINTS?.trim().length
                                    ? analysis.READINESS_CONSTRAINTS
                                    : "Timeline and urgency will appear here once analysis is complete."}
                              </p>
                            </div>

                            <div>
                              <p className="mb-1 text-sm font-semibold text-[#06B6D4]">
                                Email Status
                              </p>
                              <p className="text-slate-300">
                                {renderEmailStatus(selectedJob)}
                              </p>
                            </div>

                            <div>
                              <p className="mb-1 text-sm font-semibold text-[#06B6D4]">
                                Full report
                              </p>
                              <p className="text-slate-300 whitespace-pre-line text-xs sm:text-sm">
                                {analysis?.fullReport?.trim().length
                                  ? analysis.fullReport
                                  : "Full report is generated and sent to you by email and stored on your database."}
                              </p>
                            </div>
                          </>
                        );
                      })()}

                      <button
                        type="button"
                        onClick={() => setSelectedJob(null)}
                        className="mt-1 inline-flex w-full items-center justify-center rounded-full border border-slate-600 px-4 py-2 text-sm font-semibold text-slate-100 transition-colors hover:bg-slate-800/80 sm:w-auto"
                      >
                        Close
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </GlowCard>
      )}
    </PageShell>
  );
}
