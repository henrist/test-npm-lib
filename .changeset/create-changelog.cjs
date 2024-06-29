/**
 * @param {import('@changesets/types').NewChangesetWithCommit} changeset
 * @param {import('@changesets/types').VersionType} _type
 */
const getReleaseLine = async (changeset, _type) => {
  const [firstLine, ...futureLines] = changeset.summary
    .split('\n')
    .map((l) => l.trimEnd());

  let returnVal = `- ${firstLine}`;

  if (futureLines.length > 0) {
    returnVal += `\n${futureLines.map((l) => `  ${l}`).join('\n')}`;
  }

  return returnVal;
};

/**
 * @param {import('@changesets/types').NewChangesetWithCommit[]} changesets
 * @param {import('@changesets/types').ModCompWithPackage[]} dependenciesUpdated
 */
const getDependencyReleaseLine = async (changesets, dependenciesUpdated) => {
  if (dependenciesUpdated.length === 0) return '';

  const changesetLinks = changesets.map(() => `- Updated dependencies`);

  const updatedDependenciesList = dependenciesUpdated.map(
    (dependency) => `  - ${dependency.name}@${dependency.newVersion}`
  );

  return [...changesetLinks, ...updatedDependenciesList].join('\n');
};

/**
 * @type {import('@changesets/types').ChangelogFunctions}
 */
module.exports = {
  getReleaseLine,
  getDependencyReleaseLine,
};
