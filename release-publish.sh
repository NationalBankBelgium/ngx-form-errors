#!/usr/bin/env bash

# TODO
#===================
# provide support for publishing locally in addition to GitHub Actions

set -u -e -o pipefail

VERBOSE=false
TRACE=false
DRY_RUN=false

# We read from a file because the list is also shared with build.sh
# Not using readarray because it does not handle \r\n
#OLD_IFS=$IFS # save old IFS value
#IFS=$'\r\n' GLOBIGNORE='*' command eval 'ALL_PACKAGES=($(cat ./modules.txt))'
#IFS=$OLD_IFS # restore IFS
PACKAGE=ngx-form-errors

EXPECTED_REPOSITORY="NationalBankBelgium/ngx-form-errors"
GITHUB_REF=${GITHUB_REF:-""}

#----------------------------------------------
# Uncomment block below to test locally
#----------------------------------------------
#LOGS_DIR=./.tmp/ngx-form-errors/logs
#mkdir -p ${LOGS_DIR}
#LOGS_FILE=${LOGS_DIR}/build-perf.log
#touch ${LOGS_FILE}
#GITHUB_ACTIONS=true
#GITHUB_REPOSITORY="NationalBankBelgium/ngx-form-errors"
#GITHUB_REF="refs/tags/fooBar"
#----------------------------------------------

readonly currentDir=$(cd $(dirname $0); pwd)

source ${currentDir}/scripts/ci/_ghactions-group.sh
source ${currentDir}/util-functions.sh

cd ${currentDir}

logInfo "============================================="
logInfo "NgxFormErrors release publish @ npm"

for ARG in "$@"; do
  case "$ARG" in
    --dry-run)
      logInfo "============================================="
      logInfo "Dry run enabled!"
      DRY_RUN=true
      ;;
    --verbose)
      logInfo "============================================="
      logInfo "Verbose mode enabled!"
      VERBOSE=true
      ;;
    --trace)
      logInfo "============================================="
      logInfo "Trace mode enabled!"
      TRACE=true
      ;;
    *)
      echo "Unknown option $ARG."
      exit 1
      ;;
  esac
done
logInfo "============================================="

PROJECT_ROOT_DIR=`pwd`
logTrace "PROJECT_ROOT_DIR: ${PROJECT_ROOT_DIR}" 1
ROOT_PACKAGES_DIR=${PROJECT_ROOT_DIR}
logTrace "ROOT_PACKAGES_DIR: ${ROOT_PACKAGES_DIR}" 1

ghActionsGroupStart "publish checks" "no-xtrace"

if [[ ${GITHUB_ACTIONS} == true ]]; then
  logInfo "============================================="
  logInfo "Publishing to npm";
  logInfo "============================================="
  
  # Don't even try if not running against the official repo
  # We don't want release to run outside of our own little world
  if [[ ${GITHUB_REPOSITORY} != ${EXPECTED_REPOSITORY} ]]; then
    logInfo "Skipping release because this is not the main repository.";
    ghActionsGroupEnd "publish checks"
    exit 0;
  fi

  logInfo "Verifying if this build has been triggered for a tag" 

  if [[ ${GITHUB_REF} == refs/tags/* ]]; then
    logInfo "Not publishing because this is not a build triggered for a tag" 1
    exit 0;
  else
    logInfo "This build has been triggered for a tag"
  fi
fi

ghActionsGroupEnd "publish checks"

logInfo "============================================="
logInfo "Publishing package"
logInfo "============================================="
# FIXME Uncomment this once GitHub Actions support nested logs
# See: https://github.community/t5/GitHub-Actions/Feature-Request-Enhancements-to-group-commands-nested-named/m-p/45399
#ghActionsGroupStart "publish" "no-xtrace"
#logInfo "Publishing package"

ghActionsGroupStart "publishing: ${PACKAGE}" "no-xtrace"
  PACKAGE_FOLDER=${ROOT_PACKAGES_DIR}/dist
  logTrace "Package path: ${PACKAGE_FOLDER}" 2
  cd ${PACKAGE_FOLDER}
  TGZ_FILES=`find . -maxdepth 1 -type f | egrep -e ".tgz"`;
  for file in ${TGZ_FILES}; do
    logInfo "Publishing TGZ file: ${TGZ_FILES}" 2
    if [[ ${DRY_RUN} == false ]]; then
      logTrace "Publishing the release (with tag latest)" 2
      npm publish ${file} --access public
    else
      logTrace "DRY RUN, skipping npm publish!" 2
    fi
    logInfo "Package published!" 2
  done
  cd - > /dev/null; # go back to the previous folder without any output  
ghActionsGroupEnd "publishing: ${PACKAGE}"

#ghActionsGroupEnd "publish"

# Print return arrows as a log separator
ghActionsGroupReturnArrows
