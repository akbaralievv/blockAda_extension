async function updateStaticRules(enableRulesetIds, disableCandidateIds) {
  // Create the options structure for the call to updateEnabledRulesets()
  let options = { enableRulesetIds: enableRulesetIds, disableRulesetIds: disableCandidateIds };
  // Get the number of enabled static rules
  const enabledStaticCount = await chrome.declarativeNetRequest.getEnabledRulesets();
  // Compare rule counts to determine if anything needs to be disabled so that
  // new rules can be enabled
  const proposedCount = enableRulesetIds.length;
  if (
    enabledStaticCount + proposedCount >
    chrome.declarativeNetRequest.MAX_NUMBER_OF_ENABLED_STATIC_RULESETS
  ) {
    options.disableRulesetIds = disableCandidateIds;
  }
  // Update the enabled static rules
  await chrome.declarativeNetRequest.updateEnabledRulesets(options);
}

// Функция для получения текущего состояния правил
export async function getRulesEnabledState() {
  const enabledRuleSets = await chrome.declarativeNetRequest.getEnabledRulesets();
  return enabledRuleSets.length > 0; // Если есть включенные правила, возвращаем true
}
// Функция для включения наборов правил
export async function enableRules() {
  const enableRuleSetIds = ['default']; // Замените на фактический ID набора правил
  // Включите правила
  await updateStaticRules(enableRuleSetIds, []);
}

// Функция для выключения наборов правил
export async function disableRules() {
  const disableRuleSetIds = ['default']; // Замените на фактический ID набора правил
  // Выключите правила
  await updateStaticRules([], disableRuleSetIds);
}
