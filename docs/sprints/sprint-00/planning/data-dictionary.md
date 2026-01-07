## Entities / Objects

### CI Pipeline

A complete GitHub Actions workflow that orchestrates all validation stages for the portfolio site. The pipeline is the primary enforcement mechanism that prevents invalid code from being merged or deployed.

### CI Stage

A logical unit of validation within the CI pipeline that performs a single, well-defined class of correctness checks. Stages execute sequentially and depend on prior stage success.

### CI Job

A GitHub Actions job definition that implements one or more CI stages. Jobs are the execution units that run in the Docker environment and produce observable pass/fail outcomes.

### Validation Command

A specific shell command executed within a CI job to enforce a correctness boundary. Commands are deterministic: given the same code input, they always produce the same exit code and semantically equivalent output.

### Docker Image

A containerized execution environment built from a Dockerfile and pinned base image. The image contains all runtime and build-time dependencies required for validation and development.

### Docker Container

A running instance of the Docker image. Containers provide isolated execution contexts for validation commands in CI, local development, and agent workflows.

### Dockerfile

A text file containing instructions to build the Docker image. The Dockerfile is version-controlled and specifies exact base image digest, system packages, and environment configuration.

### Base Image

The foundation Docker image (e.g., `node:20.11.0-alpine@sha256:...`) from which the project's Docker image is built. The base image is pinned to an exact digest to ensure reproducibility.

### Execution Entrypoint

A documented command or script that serves as the standard interface for running validation or build tasks within the Docker container. Entrypoints are idempotent and have well-defined exit code semantics.

### Validation Artifact

An output file produced by a validation command (e.g., test report, coverage report, lint results) that is uploaded to GitHub Actions artifacts for audit and debugging purposes.

### Merge Gate

A GitHub branch protection rule that requires all CI checks to pass before a pull request can be merged to the target branch.

### Exit Code

An integer returned by a validation command upon completion. Exit code 0 indicates success; any non-zero exit code indicates failure.

### Lock File

A file (`package-lock.json`) that pins exact versions and integrity hashes for all npm dependencies. Lock files ensure reproducible dependency installation across environments.

## Fields / Attributes

### CI Pipeline Attributes

- **name**: Human-readable identifier for the pipeline (e.g., "Pull Request Validation")
- **trigger**: GitHub event that initiates pipeline execution (e.g., `pull_request`, `push`)
- **jobs**: Array of CI jobs to execute
- **runs-on**: GitHub Actions runner environment specification (defined by Docker execution; runner only provides Docker runtime)

### CI Stage Attributes

- **name**: Logical identifier for the validation stage (e.g., "Type Checking", "Linting")
- **validation_command**: The shell command executed for this stage
- **depends_on**: Array of stage names that must complete successfully before this stage runs (sequential ordering)
- **required_for_merge**: Boolean indicating whether stage must pass for merge gate

### CI Job Attributes

- **job_id**: Unique identifier for the job within the workflow
- **container**: Docker image reference used for job execution
- **steps**: Array of steps executed within the job (checkout, setup, validation commands)
- **timeout_minutes**: Maximum execution time before job is terminated
- **upload_artifacts**: Boolean indicating whether validation artifacts are uploaded

### Validation Command Attributes

- **command**: Exact shell command executed (e.g., `npm run typecheck`)
- **exit_code_success**: Expected exit code for success (always 0)
- **exit_code_failure**: Range of exit codes indicating failure (any non-zero)
- **output_format**: Format of command output (e.g., text, JSON, JUnit XML)
- **idempotent**: Boolean confirming command can be run multiple times with same result

### Docker Image Attributes

- **base_image**: Fully qualified base image reference with digest (e.g., `node:20.11.0-alpine@sha256:abc123...`)
- **image_tag**: Tag for the built project image (e.g., `portfolio-site:latest`)
- **build_context**: Directory used as context for Docker build (usually repository root)
- **dockerfile_path**: Path to Dockerfile relative to build context
- **layers**: Array of Dockerfile instructions (FROM, RUN, COPY, etc.)

### Docker Container Attributes

- **container_id**: Unique identifier for running container instance
- **image**: Docker image from which container is instantiated
- **entrypoint**: Command executed when container starts
- **environment_variables**: Key-value pairs for environment variables passed to container
- **working_directory**: Directory within container where commands execute
- **volumes**: Mounted volumes for code or artifact access (local development only; CI uses checkout)

### Dockerfile Attributes

- **base_image_line**: FROM instruction specifying pinned base image
- **system_packages**: Array of system packages installed via apk/apt/yum
- **working_directory_instruction**: WORKDIR instruction setting container working directory
- **copy_instructions**: Array of COPY instructions for adding files to image
- **run_instructions**: Array of RUN instructions for build-time commands
- **entrypoint_instruction**: ENTRYPOINT or CMD instruction (if specified)

### Lock File Attributes

- **lockfile_version**: Lock file format version (e.g., npm v2, v3)
- **packages**: Object mapping package names to version and integrity metadata
- **integrity_hash**: SHA-512 hash for package tarball verification
- **resolved_url**: URL from which package was resolved

### Validation Artifact Attributes

- **artifact_name**: Identifier for uploaded artifact (e.g., "test-results", "coverage-report")
- **artifact_path**: Path to file or directory uploaded as artifact
- **retention_days**: Number of days artifact is retained in GitHub Actions storage
- **file_format**: Format of artifact content (e.g., XML, JSON, HTML)

### Merge Gate Attributes

- **branch_name**: Branch protected by the gate (e.g., `main`)
- **required_checks**: Array of CI check names that must pass
- **require_review**: Boolean indicating whether code review is required (orthogonal to CI)
- **dismiss_stale_reviews**: Boolean for review invalidation on new commits

### Exit Code Attributes

- **value**: Integer exit code (0-255)
- **interpretation**: Semantic meaning (0 = success, 1 = general failure, 2+ = specific error codes)

## Relationships

### CI Pipeline → CI Job

- **Relationship**: Contains (1:N)
- **Description**: A CI pipeline defines one or more CI jobs that execute as part of the workflow
- **Cardinality**: One pipeline contains multiple jobs; jobs belong to exactly one pipeline

### CI Job → CI Stage

- **Relationship**: Implements (N:M)
- **Description**: A CI job may implement one or more logical validation stages; a stage may span multiple jobs (though Sprint-00 uses 1:1 mapping)
- **Cardinality**: Jobs implement stages; stages are realized by jobs

### CI Stage → Validation Command

- **Relationship**: Executes (1:1)
- **Description**: Each CI stage executes exactly one validation command to perform its checks
- **Cardinality**: One stage, one primary validation command

### CI Job → Docker Container

- **Relationship**: Runs In (1:1)
- **Description**: Each CI job execution runs in exactly one Docker container instance
- **Cardinality**: One job execution, one container instance (new instance per job run)

### Docker Container → Docker Image

- **Relationship**: Instantiated From (N:1)
- **Description**: Multiple container instances can be created from a single Docker image
- **Cardinality**: Many containers instantiated from one image; each container has exactly one source image

### Docker Image → Dockerfile

- **Relationship**: Built From (1:1)
- **Description**: A Docker image is built by executing the instructions in a Dockerfile
- **Cardinality**: One image built from one Dockerfile; Dockerfile can produce multiple tagged images (same content)

### Dockerfile → Base Image

- **Relationship**: Depends On (1:1)
- **Description**: A Dockerfile specifies exactly one base image as its foundation
- **Cardinality**: One Dockerfile, one base image reference

### Validation Command → Exit Code

- **Relationship**: Produces (1:1)
- **Description**: Each validation command execution produces exactly one exit code
- **Cardinality**: One command execution, one exit code

### Validation Command → Validation Artifact

- **Relationship**: Produces (1:N)
- **Description**: A validation command may produce zero or more artifact files (e.g., test reports, coverage)
- **Cardinality**: One command can produce multiple artifacts; artifacts belong to one command execution

### CI Pipeline → Merge Gate

- **Relationship**: Enforced By (N:1)
- **Description**: Multiple CI pipeline runs are evaluated by a single merge gate configuration
- **Cardinality**: Many pipeline executions evaluated by one gate rule; gate references specific pipeline checks

### Docker Image → Lock File

- **Relationship**: Uses (1:1)
- **Description**: Docker image build uses the lock file to install exact dependency versions
- **Cardinality**: One image build uses one lock file (package-lock.json)

### CI Job → Validation Artifact

- **Relationship**: Uploads (1:N)
- **Description**: A CI job uploads zero or more validation artifacts to GitHub Actions artifact storage
- **Cardinality**: One job uploads multiple artifacts; artifacts belong to one job execution

### Execution Entrypoint → Validation Command

- **Relationship**: Invokes (1:N)
- **Description**: An entrypoint may invoke one or more validation commands in sequence
- **Cardinality**: One entrypoint can call multiple commands; commands may be shared across entrypoints
