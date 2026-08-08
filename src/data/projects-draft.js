// Projects that are not published yet.
//
// This file is deliberately NOT imported anywhere. Anything imported by the app ends
// up in the JS bundle and is readable by anyone who opens it — "hidden" in the data
// would still ship the text. Keeping drafts out of the import graph keeps them off
// the site entirely.
//
// To publish: move the entry into `projects` in resume.js. Every surface — the
// Projects page, llms.txt, llms-full.txt and resume.json — picks it up from there.

export const draftProjects = [
  {
    id: 'contactless-lie-detector',
    icon: 'wifi',
    name: 'Contactless Lie Detector',
    subtitle: 'WiFi-sensed vitals → HRV → deception scoring',
    status: 'In progress',
    tags: ['WiFi CSI', 'Pulse-Fi', 'HRV', 'Python', 'Signal Processing', 'Machine Learning'],
    bullets: [
      'Designing a passive alternative to polygraph examination that recovers physiological signals over commodity WiFi — no electrodes, no contact sensors, and no examiner in the loop.',
      'Mapped the design against the traditional four-channel polygraph stack (thoracic respiration, abdominal respiration, cardiovascular, electrodermal). WiFi sensing covers the respiratory and cardiovascular channels natively; electrodermal activity — the channel usually treated as most diagnostic — is not recoverable from RF alone, making it the known gap in the approach.',
      'Anchored the signal design on respiratory suppression — shallower, slower breathing following a relevant question relative to baseline — which is among the more reliable deception indicators and already falls out of the WiFi breathing-rate channel.',
      'Selected Pulse-Fi as the sensing layer, extracting heart rate and breathing rate from WiFi channel state information on off-the-shelf hardware.',
      'Targeting heart rate variability rather than average BPM as the primary feature. HRV tracks sympathetic arousal more closely and helps separate physical exertion from a stress response — a distinction average heart rate, which conventional polygraphs lean on, cannot make.',
      'Grounded the scoring model on the methodology behind LieRHRV (Scientific Reports), a remote HRV-only deception model driven by facial video that reported 80% accuracy in a prospective study. The paper documents the method in full even though the implementation is not open source.',
    ],
    pipeline: ['Pulse-Fi WiFi layer', 'Heart rate + breathing rate', 'HRV from beat intervals', 'Deception scoring model'],
    future: [
      "Port LieRHRV's published feature set onto beat intervals recovered from WiFi rather than facial video, using existing open-source Python HRV libraries for the signal-processing layer.",
      'Establish per-subject baselines so every score is measured against that person’s own resting state instead of a population average.',
      'Quantify the accuracy cost of running without the electrodermal channel, and determine whether respiratory suppression features close any of that gap.',
      'Validate against a controlled ground-truth protocol before any accuracy claim is attached to the system.',
      'Package the stack as a documented Python library with a stable API for the sensing, HRV, and scoring layers.',
      'Publish confidence intervals and explicit intended-use limits alongside any result — deception detection is a contested field, and a contactless system invites use where consent is unclear.',
    ],
  },
]
