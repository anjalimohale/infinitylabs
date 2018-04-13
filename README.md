# Property Listing Portal

## Developer Guideline

- Two things you should never do in git:
    - NEVER force a push, If you find yourself in a situation where your changes can't be pushed upstream, something is wrong. Contact with another senior developerfor help tracking down the problem.
    - NEVER rebase a branch that you pushed, or that you pulled from another person
      Rebasing published branches can lead to duplicate commits in the shared repository.


- In general, the preferred workflow is:
    - Create a branch from master, check it out, do your work
    - Test and commit your changes
    - Optionally push your branch up to the remote repository (origin)
    - Checkout master, make sure it's up-to-date with upstream changes
    - Checkout your branch.
    - Merge master branch in your branch
    - Test it again (and again)
    - Push your local copy of your branch up to the remote repository (origin/your branch)
    - Create pull request to the master and don't merge pull request, first it would be review and then it will be merge in master.
    - After merge delete your branch (and remotely, too, if you published it)
